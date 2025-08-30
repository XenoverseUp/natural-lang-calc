package com.xenoverseup.natural_calculator.controller;

import com.xenoverseup.natural_calculator.dto.CalculationRequest;
import com.xenoverseup.natural_calculator.dto.CalculationResponse;
import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.model.Operation;
import com.xenoverseup.natural_calculator.service.CalculationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class CalculationController {

    private final CalculationService calculationService;

    @GetMapping("/check")
    public ResponseEntity<String> check() {
        return  ResponseEntity.ok("OK");
    }

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(@Valid @RequestBody CalculationRequest body) {
        CalculationRequest.Numbers numbers = body.getNumbers();
        Operation operation = body.getOperation();
        AppLocale appLocale = body.getAppLocale();

        String result = calculationService.calculate(
                numbers.getFirst(),
                numbers.getSecond(),
                operation,
                appLocale
        );

        CalculationResponse response = new CalculationResponse(result);
        return ResponseEntity.ok(response);
    }
}
