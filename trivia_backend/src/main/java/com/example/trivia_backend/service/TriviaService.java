package com.example.trivia_backend.service;

import com.example.trivia_backend.DTOs.api.CheckAnswersRequestDto;
import com.example.trivia_backend.DTOs.api.CheckAnswersResponseDto;
import com.example.trivia_backend.DTOs.api.QuestionsResponseDto;

/**
 * Service for managing trivia quiz sessions.
 */
public interface TriviaService {
    /**
     * Retrieves trivia questions and creates a new quiz session.
     */
    QuestionsResponseDto getQuestions(int amount, Integer category, String difficulty, String type);

    /**
     * Validates submitted answers against a quiz session.
     */
    CheckAnswersResponseDto checkAnswers(CheckAnswersRequestDto request);

}
