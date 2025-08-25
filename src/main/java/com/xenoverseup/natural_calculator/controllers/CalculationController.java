package com.xenoverseup.natural_calculator.controllers;

import com.xenoverseup.natural_calculator.dto.CalculationRequest;
import com.xenoverseup.natural_calculator.dto.CalculationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
public class CalculationController {

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(@RequestBody CalculationRequest input) {

        return ResponseEntity.ok(new CalculationResponse("calculated"));
    }
}
