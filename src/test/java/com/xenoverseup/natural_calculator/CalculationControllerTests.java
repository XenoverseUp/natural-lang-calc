package com.xenoverseup.natural_calculator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xenoverseup.natural_calculator.dto.CalculationRequest;
import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.model.Operation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CalculationControllerTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void checkEndpointReturnsOK() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/v1/check", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OK", response.getBody());
    }

    @Test
    void calculateEndpointWorksEndToEnd() throws Exception {
        CalculationRequest.Numbers numbers = new CalculationRequest.Numbers();
        numbers.setFirst("one");
        numbers.setSecond("two");

        CalculationRequest request = new CalculationRequest();
        request.setNumbers(numbers);
        request.setOperation(Operation.ADD);
        request.setAppLocale(AppLocale.EN);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(request), headers);

        ResponseEntity<String> response = restTemplate.postForEntity("/api/v1/calculate", entity, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().contains("three"));
    }
}
