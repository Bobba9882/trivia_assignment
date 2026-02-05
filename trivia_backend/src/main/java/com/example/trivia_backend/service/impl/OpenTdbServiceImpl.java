package com.example.trivia_backend.service.impl;

import com.example.trivia_backend.DTOs.opentdb.OpenTdbResponseDto;
import com.example.trivia_backend.service.OpenTdbService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Implementation of OpenTdbService that fetches questions from the Open Trivia Database API.
 * Questions are returned with URL encoding (url3986) to handle special characters.
 */
@Service
public class OpenTdbServiceImpl implements OpenTdbService {

    private static final String BASE_URL = "https://opentdb.com/api.php";

    private final RestClient restClient = RestClient.create();

    @Override
    public OpenTdbResponseDto fetchQuestions(int amount, Integer category, String difficulty, String type) {
        String uri = UriComponentsBuilder
                .fromUriString(BASE_URL)
                .queryParam("amount", amount)
                .queryParamIfPresent("category", java.util.Optional.ofNullable(category))
                .queryParamIfPresent("difficulty", java.util.Optional.ofNullable(difficulty))
                .queryParamIfPresent("type", java.util.Optional.ofNullable(type))
                .queryParam("encode", "url3986")
                .toUriString();

        return restClient
                .get()
                .uri(uri)
                .retrieve()
                .body(OpenTdbResponseDto.class);
    }
}
