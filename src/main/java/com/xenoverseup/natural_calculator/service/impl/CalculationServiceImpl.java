package com.xenoverseup.natural_calculator.service.impl;

import com.xenoverseup.natural_calculator.model.Operation;
import com.xenoverseup.natural_calculator.service.CalculationService;
import com.xenoverseup.natural_calculator.service.NumberConversionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CalculationServiceImpl implements CalculationService {
    private final NumberConversionService numberConversionService;

    @Override
    public String calculate(String number1, String number2, Operation operation) {
        return numberConversionService.number2word(45);
    }
}
