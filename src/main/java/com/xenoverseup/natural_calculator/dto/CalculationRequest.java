package com.xenoverseup.natural_calculator.dto;


import com.xenoverseup.natural_calculator.model.Operation;
import lombok.Data;

@Data
public class CalculationRequest {
    int number1;
    int number2;
    Operation operation;
}
