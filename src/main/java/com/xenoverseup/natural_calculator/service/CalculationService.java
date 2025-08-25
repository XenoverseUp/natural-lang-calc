package com.xenoverseup.natural_calculator.service;

import com.xenoverseup.natural_calculator.model.Operation;

public interface CalculationService {
    String calculate(String number1, String number2, Operation operation);
}
