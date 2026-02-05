package com.example.trivia_backend.service.impl;

import com.example.trivia_backend.DTOs.api.*;
import com.example.trivia_backend.DTOs.cache.QuizSessionCacheDto;
import com.example.trivia_backend.DTOs.opentdb.OpenTdbQuestionDto;
import com.example.trivia_backend.DTOs.opentdb.OpenTdbResponseDto;
import com.example.trivia_backend.service.OpenTdbService;
import com.example.trivia_backend.service.TriviaService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.*;

/**
 * Implementation of TriviaService that manages quiz sessions.
 * Fetches questions from Open Trivia DB, creates sessions with unique IDs,
 * and validates answers against cached session data.
 */
@Service
public class TriviaServiceImpl implements TriviaService {

    private static final String CACHE_NAME = "triviaSessions";

    private final OpenTdbService openTdbService;
    private final Cache triviaSessionsCache;
    private final int cacheSessionTtlMinutes;

    public TriviaServiceImpl(OpenTdbService openTdbService,
                             CacheManager cacheManager,
                             @Value("${cache.session.ttl.minutes}") int cacheSessionTtlMinutes) {
        this.openTdbService = openTdbService;
        this.triviaSessionsCache = cacheManager.getCache(CACHE_NAME);
        this.cacheSessionTtlMinutes = cacheSessionTtlMinutes;
    }

    @Override
    public QuestionsResponseDto getQuestions(int amount, Integer category, String difficulty, String type) {
        OpenTdbResponseDto response = openTdbService.fetchQuestions(amount, category, difficulty, type);
        String sessionId = UUID.randomUUID().toString();
        Instant now = Instant.now();

        Map<String, String> correctAnswerByQuestionId = new HashMap<>();
        List<QuestionDto> questions = new ArrayList<>();

        for (OpenTdbQuestionDto q : response.getResults()){
            String questionId = UUID.randomUUID().toString();

            // decode url3986
            String decodedQuestion = decode(q.getQuestion());
            String decodedCategory = decode(q.getCategory());

            //add all answers to list and shuffle
            List<String> answers = new ArrayList<>();
            answers.add(decode(q.getCorrectAnswer()));
            q.getIncorrectAnswers()
                    .forEach(a -> answers.add(decode(a)));
            Collections.shuffle(answers);

            //saves correct answer
            correctAnswerByQuestionId.put(
                    questionId,
                    decode(q.getCorrectAnswer())
            );

            questions.add(
                    QuestionDto.builder()
                            .questionId(questionId)
                            .type(q.getType())
                            .difficulty(q.getDifficulty())
                            .category(decodedCategory)
                            .question(decodedQuestion)
                            .answers(answers)
                            .build()
            );
        }

        QuizSessionCacheDto cacheDto = QuizSessionCacheDto.builder()
                .sessionId(sessionId)
                .correctAnswerByQuestionId(correctAnswerByQuestionId)
                .createdAt(now)
                .expiresAt(now.plusSeconds(cacheSessionTtlMinutes * 60))
                .build();

        //caches correct answers by sessionId
        triviaSessionsCache.put(sessionId, cacheDto);

        return QuestionsResponseDto.builder()
                .sessionId(sessionId)
                .questions(questions)
                .build();
    }

    @Override
    public CheckAnswersResponseDto checkAnswers(CheckAnswersRequestDto request) {
        QuizSessionCacheDto session =
                triviaSessionsCache.get(
                        request.getSessionId(),
                        QuizSessionCacheDto.class
                );

        if (session == null) {
            throw new IllegalStateException("Session expired or invalid");
        }

        Map<String, AnswerResultDto> results = new HashMap<>();
        int correctCount = 0;

        for (Map.Entry<String,String> entry : request.getAnswersByQuestionId().entrySet()){

            String questionId = entry.getKey();
            String userAnswer = entry.getValue();

            String correctAnswer = session.getCorrectAnswerByQuestionId().get(questionId);

            boolean correct = correctAnswer != null && correctAnswer.equals(userAnswer);

            if (correct) {
                correctCount++;
            }

            results.put(
                    questionId,
                    AnswerResultDto.builder()
                            .correct(correct)
                            .correctAnswer(correctAnswer)
                            .build()
            );
        }

        int submittedCount = request.getAnswersByQuestionId().size();

        // Clean up session cache once all questions are answered
        if (submittedCount >= session.getCorrectAnswerByQuestionId().size()){
            System.out.println("evicting cache for sessionId: " + request.getSessionId());
            triviaSessionsCache.evict(request.getSessionId());
        }
        return CheckAnswersResponseDto.builder()
                .resultsByQuestionId(results)
                .correctCount(correctCount)
                .submittedCount(submittedCount)
                .build();
    }

    private String decode(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }
}
