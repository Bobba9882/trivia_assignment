package com.example.trivia_backend.DTOs.cache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

/**
 * Cached quiz session data containing correct answers for validation.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizSessionCacheDto {
    private String sessionId;
    private Map<String, String> correctAnswerByQuestionId;
    private Instant createdAt;
    private Instant expiresAt;
}
