package com.example.trivia_backend.DTOs.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Result of validating a single answer in a quiz session.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResultDto {
    private boolean correct;
    private String correctAnswer;
}
