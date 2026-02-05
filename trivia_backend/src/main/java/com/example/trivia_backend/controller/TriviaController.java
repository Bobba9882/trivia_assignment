package com.example.trivia_backend.controller;

import com.example.trivia_backend.DTOs.api.CheckAnswersRequestDto;
import com.example.trivia_backend.DTOs.api.CheckAnswersResponseDto;
import com.example.trivia_backend.DTOs.api.QuestionsResponseDto;
import com.example.trivia_backend.service.TriviaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for trivia quiz operations.
 * Handles question retrieval and answer validation.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/trivia")
public class TriviaController {

    private final TriviaService triviaService;

    public TriviaController(TriviaService triviaService) {
        this.triviaService = triviaService;
    }

    /**
     * Example:
     * /api/trivia/questions?amount=10&category=18&difficulty=easy&type=multiple
     */
    @GetMapping("/questions")
    public ResponseEntity<QuestionsResponseDto> getQuestions(
            @RequestParam(defaultValue = "10") int amount,
            @RequestParam(required = false) Integer category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String type
    ) {
        QuestionsResponseDto response = triviaService.getQuestions(amount, category, difficulty, type);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkanswers")
    public ResponseEntity<CheckAnswersResponseDto> checkAnswers(
            @RequestBody CheckAnswersRequestDto request
    ) {
        CheckAnswersResponseDto response = triviaService.checkAnswers(request);
        return ResponseEntity.ok(response);
    }
}
