package com.example.trivia_backend.service.impl;

import com.example.trivia_backend.DTOs.opentdb.OpenTdbResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OpenTdbServiceImplTest {

    @Autowired
    private OpenTdbServiceImpl openTdbService;

    @Test
    void fetchQuestions_shouldReturnValidResponse() {
        // When
        OpenTdbResponseDto response = openTdbService.fetchQuestions(1, null, null, null);

        // Then
        assertNotNull(response);
        assertEquals(0, response.getResponseCode());
        assertNotNull(response.getResults());
        assertEquals(1, response.getResults().size());
        assertNotNull(response.getResults().get(0).getQuestion());
    }
}
