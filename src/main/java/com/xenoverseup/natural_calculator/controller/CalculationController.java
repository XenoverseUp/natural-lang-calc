package com.xenoverseup.natural_calculator.controller;

import com.xenoverseup.natural_calculator.dto.CalculationRequest;
import com.xenoverseup.natural_calculator.dto.CalculationResponse;
import com.xenoverseup.natural_calculator.model.Operation;
import com.xenoverseup.natural_calculator.service.CalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class CalculationController {

    private final CalculationService calculationService;

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(@RequestBody CalculationRequest input) {
        String result = calculationService.calculate("forty", "five", Operation.ADD);

        CalculationResponse response = new CalculationResponse(result);
        return ResponseEntity.ok(response);
    }
}
