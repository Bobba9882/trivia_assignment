package com.example.trivia_backend.DTOs.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {
    private String questionId;
    private String type;
    private String difficulty;
    private String category;
    private String question;
    private List<String> answers; // shuffled answers (includes correct + incorrect)
}
