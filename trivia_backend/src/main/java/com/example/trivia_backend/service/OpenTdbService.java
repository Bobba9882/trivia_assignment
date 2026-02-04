package com.example.trivia_backend.service;

import com.example.trivia_backend.DTOs.opentdb.OpenTdbResponseDto;

public interface OpenTdbService {

    OpenTdbResponseDto fetchQuestions(int amount, Integer category, String difficulty, String type);

}
