package com.xenoverseup.natural_calculator.dto;


import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.model.Operation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CalculationRequest {
    @NotBlank( message = "`number1` field is required.")
    String number1;

    @NotBlank( message = "`number2` field is required.")
    String number2;

    @NotNull(message = "`operation` field is required.")
    Operation operation;
    AppLocale appLocale = AppLocale.TR;
}
