package com.example.trivia_backend.service;

import com.example.trivia_backend.DTOs.opentdb.OpenTdbResponseDto;

/**
 * Service for interacting with the Open Trivia Database API.
 */
public interface OpenTdbService {

    /**
     * Fetches trivia questions from the Open Trivia Database API.
     */
    OpenTdbResponseDto fetchQuestions(int amount, Integer category, String difficulty, String type);

}
