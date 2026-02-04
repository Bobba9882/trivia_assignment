package com.example.trivia_backend.DTOs.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckAnswersRequestDto {
    private String sessionId;
    private Map<String, String> answersByQuestionId;
}
