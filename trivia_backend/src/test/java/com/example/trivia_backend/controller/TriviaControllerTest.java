package com.example.trivia_backend.controller;

import com.example.trivia_backend.DTOs.api.*;
import com.example.trivia_backend.service.TriviaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TriviaControllerTest {

    @Mock
    private TriviaService triviaService;

    @InjectMocks
    private TriviaController triviaController;

    @Test
    void getQuestions_shouldReturnQuestions() {
        // Given
        QuestionDto question = QuestionDto.builder()
                .questionId("q1")
                .type("multiple")
                .difficulty("easy")
                .category("Science")
                .question("What is H2O?")
                .answers(Arrays.asList("Water", "Oxygen", "Hydrogen", "Carbon"))
                .build();

        QuestionsResponseDto response = QuestionsResponseDto.builder()
                .sessionId("session-123")
                .questions(Collections.singletonList(question))
                .build();

        when(triviaService.getQuestions(anyInt(), any(), any(), any())).thenReturn(response);

        // When
        ResponseEntity<QuestionsResponseDto> result = triviaController.getQuestions(1, null, null, null);

        // Then
        assertNotNull(result);
        assertEquals(200, result.getStatusCode().value());
        assertNotNull(result.getBody());
        assertEquals("session-123", result.getBody().getSessionId());
        assertEquals(1, result.getBody().getQuestions().size());
        assertEquals("Science", result.getBody().getQuestions().get(0).getCategory());
    }

    @Test
    void checkAnswers_shouldReturnResults() {
        // Given
        Map<String, String> answers = new HashMap<>();
        answers.put("q1", "Water");

        CheckAnswersRequestDto request = CheckAnswersRequestDto.builder()
                .sessionId("session-123")
                .answersByQuestionId(answers)
                .build();

        Map<String, AnswerResultDto> results = new HashMap<>();
        results.put("q1", AnswerResultDto.builder()
                .correct(true)
                .correctAnswer("Water")
                .build());

        CheckAnswersResponseDto response = CheckAnswersResponseDto.builder()
                .resultsByQuestionId(results)
                .correctCount(1)
                .submittedCount(1)
                .build();

        when(triviaService.checkAnswers(any(CheckAnswersRequestDto.class))).thenReturn(response);

        // When
        ResponseEntity<CheckAnswersResponseDto> result = triviaController.checkAnswers(request);

        // Then
        assertNotNull(result);
        assertEquals(200, result.getStatusCode().value());
        assertNotNull(result.getBody());
        assertEquals(1, result.getBody().getCorrectCount());
        assertEquals(1, result.getBody().getSubmittedCount());
        assertTrue(result.getBody().getResultsByQuestionId().get("q1").isCorrect());
    }
}
