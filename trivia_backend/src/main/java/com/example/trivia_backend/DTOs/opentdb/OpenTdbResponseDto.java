package com.example.trivia_backend.DTOs.opentdb;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Response wrapper from the Open Trivia Database API.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpenTdbResponseDto {
    @JsonProperty("response_code")
    private int responseCode;

    private List<OpenTdbQuestionDto> results;
}
