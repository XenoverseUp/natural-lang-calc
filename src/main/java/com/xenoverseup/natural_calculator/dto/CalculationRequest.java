package com.xenoverseup.natural_calculator.dto;

import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.model.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CalculationRequest {

    @Valid
    @NotNull(message = "`numbers` field is required.")
    private Numbers numbers;

    @NotNull(message = "`operation` field is required.")
    private Operation operation;

    private AppLocale appLocale = AppLocale.TR;

    @Data
    public static class Numbers {
        @NotBlank(message = "`first` field is required.")
        private String first;

        @NotBlank(message = "`second` field is required.")
        private String second;
    }
}
