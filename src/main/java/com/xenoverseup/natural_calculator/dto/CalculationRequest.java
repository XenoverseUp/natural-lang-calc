package com.xenoverseup.natural_calculator.dto;


import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.model.Operation;
import lombok.Data;

@Data
public class CalculationRequest {
    String number1;
    String number2;
    Operation operation;
    AppLocale appLocale = AppLocale.TR;
}
