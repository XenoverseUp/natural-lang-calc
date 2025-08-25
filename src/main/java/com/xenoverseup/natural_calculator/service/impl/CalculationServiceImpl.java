package com.xenoverseup.natural_calculator.service.impl;

import com.xenoverseup.natural_calculator.model.AppLocale;
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
    public String calculate(String number1, String number2, Operation operation, AppLocale appLocale) {
        Integer num1 = numberConversionService.word2number(number1, appLocale);
        Integer num2 = numberConversionService.word2number(number2, appLocale);

        Integer result = null;
        result = switch (operation) {
            case ADD -> num1 + num2;
            case SUBTRACT -> num1 - num2;
            case MULTIPLY -> num1 * num2;
            case DIVIDE -> num1 / num2;
            case MOD -> num1 % num2;
        };

        return numberConversionService.number2word(result, appLocale);
    }
}
