package com.example.trivia_backend.DTOs.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * Response containing validation results for submitted answers.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckAnswersResponseDto {
    private Map<String, AnswerResultDto> resultsByQuestionId;
    private int correctCount;
    private int submittedCount;
}
