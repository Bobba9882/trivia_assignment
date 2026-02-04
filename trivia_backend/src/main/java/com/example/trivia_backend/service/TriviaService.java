package com.example.trivia_backend.service;

import com.example.trivia_backend.DTOs.api.CheckAnswersRequestDto;
import com.example.trivia_backend.DTOs.api.CheckAnswersResponseDto;
import com.example.trivia_backend.DTOs.api.QuestionsResponseDto;

public interface TriviaService {
    QuestionsResponseDto getQuestions(int amount, Integer category, String difficulty, String type);

    CheckAnswersResponseDto checkAnswers(CheckAnswersRequestDto request);

}
