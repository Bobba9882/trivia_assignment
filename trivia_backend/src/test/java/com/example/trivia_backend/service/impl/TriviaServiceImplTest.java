package com.example.trivia_backend.service.impl;

import com.example.trivia_backend.DTOs.api.*;
import com.example.trivia_backend.DTOs.cache.QuizSessionCacheDto;
import com.example.trivia_backend.DTOs.opentdb.OpenTdbQuestionDto;
import com.example.trivia_backend.DTOs.opentdb.OpenTdbResponseDto;
import com.example.trivia_backend.service.OpenTdbService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TriviaServiceImplTest {

    @Mock
    private OpenTdbService openTdbService;

    @Mock
    private CacheManager cacheManager;

    @Mock
    private Cache cache;

    private TriviaServiceImpl triviaService;

    @BeforeEach
    void setUp() {
        when(cacheManager.getCache("triviaSessions")).thenReturn(cache);
        triviaService = new TriviaServiceImpl(openTdbService, cacheManager, 30);
    }

    @Test
    void getQuestions_shouldReturnQuestionsWithSessionId() {
        // Given
        OpenTdbQuestionDto question = OpenTdbQuestionDto.builder()
                .type("multiple")
                .difficulty("easy")
                .category("Science")
                .question("What%20is%20H2O%3F")
                .correctAnswer("Water")
                .incorrectAnswers(Arrays.asList("Oxygen", "Hydrogen", "Carbon"))
                .build();

        OpenTdbResponseDto mockResponse = OpenTdbResponseDto.builder()
                .responseCode(0)
                .results(Collections.singletonList(question))
                .build();

        when(openTdbService.fetchQuestions(anyInt(), any(), any(), any())).thenReturn(mockResponse);

        // When
        QuestionsResponseDto result = triviaService.getQuestions(1, null, null, null);

        // Then
        assertNotNull(result);
        assertNotNull(result.getSessionId());
        assertEquals(1, result.getQuestions().size());
        assertEquals("Science", result.getQuestions().get(0).getCategory());
        assertEquals(4, result.getQuestions().get(0).getAnswers().size());
        verify(cache).put(anyString(), any(QuizSessionCacheDto.class));
    }

    @Test
    void checkAnswers_shouldReturnCorrectResults() {
        // Given
        String sessionId = "test-session-id";
        String questionId = "q1";
        String correctAnswer = "Water";

        Map<String, String> correctAnswerMap = new HashMap<>();
        correctAnswerMap.put(questionId, correctAnswer);

        QuizSessionCacheDto session = QuizSessionCacheDto.builder()
                .sessionId(sessionId)
                .correctAnswerByQuestionId(correctAnswerMap)
                .build();

        when(cache.get(sessionId, QuizSessionCacheDto.class)).thenReturn(session);

        Map<String, String> userAnswers = new HashMap<>();
        userAnswers.put(questionId, correctAnswer);

        CheckAnswersRequestDto request = CheckAnswersRequestDto.builder()
                .sessionId(sessionId)
                .answersByQuestionId(userAnswers)
                .build();

        // When
        CheckAnswersResponseDto result = triviaService.checkAnswers(request);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getCorrectCount());
        assertEquals(1, result.getSubmittedCount());
        assertTrue(result.getResultsByQuestionId().get(questionId).isCorrect());
        verify(cache).evict(sessionId);
    }

    @Test
    void checkAnswers_shouldHandleIncorrectAnswer() {
        // Given
        String sessionId = "test-session-id";
        String questionId = "q1";

        Map<String, String> correctAnswerMap = new HashMap<>();
        correctAnswerMap.put(questionId, "Water");

        QuizSessionCacheDto session = QuizSessionCacheDto.builder()
                .sessionId(sessionId)
                .correctAnswerByQuestionId(correctAnswerMap)
                .build();

        when(cache.get(sessionId, QuizSessionCacheDto.class)).thenReturn(session);

        Map<String, String> userAnswers = new HashMap<>();
        userAnswers.put(questionId, "Oxygen");

        CheckAnswersRequestDto request = CheckAnswersRequestDto.builder()
                .sessionId(sessionId)
                .answersByQuestionId(userAnswers)
                .build();

        // When
        CheckAnswersResponseDto result = triviaService.checkAnswers(request);

        // Then
        assertNotNull(result);
        assertEquals(0, result.getCorrectCount());
        assertEquals(1, result.getSubmittedCount());
        assertFalse(result.getResultsByQuestionId().get(questionId).isCorrect());
        assertEquals("Water", result.getResultsByQuestionId().get(questionId).getCorrectAnswer());
    }

    @Test
    void checkAnswers_shouldThrowExceptionWhenSessionExpired() {
        // Given
        when(cache.get(anyString(), eq(QuizSessionCacheDto.class))).thenReturn(null);

        CheckAnswersRequestDto request = CheckAnswersRequestDto.builder()
                .sessionId("invalid-session")
                .answersByQuestionId(new HashMap<>())
                .build();

        // When & Then
        IllegalStateException exception = assertThrows(
                IllegalStateException.class,
                () -> triviaService.checkAnswers(request)
        );

        assertEquals("Session expired or invalid", exception.getMessage());
    }
}
