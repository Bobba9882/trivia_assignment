package com.example.trivia_backend.DTOs.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response containing a list of trivia questions and a session identifier.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionsResponseDto {
    private String sessionId;
    private List<QuestionDto> questions;
}
