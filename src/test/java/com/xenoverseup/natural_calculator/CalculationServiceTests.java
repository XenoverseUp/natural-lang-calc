package com.xenoverseup.natural_calculator;

import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.model.Operation;
import com.xenoverseup.natural_calculator.service.NumberConversionService;
import com.xenoverseup.natural_calculator.service.impl.CalculationServiceImpl;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CalculationServiceTests {

    private final NumberConversionService numberConversionService = mock(NumberConversionService.class);
    private final CalculationServiceImpl service = new CalculationServiceImpl(numberConversionService);

    @Test
    void addOperationWorksCorrectly() {
        when(numberConversionService.word2number("one", AppLocale.EN)).thenReturn(1);
        when(numberConversionService.word2number("two", AppLocale.EN)).thenReturn(2);
        when(numberConversionService.number2word(3, AppLocale.EN)).thenReturn("three");

        String result = service.calculate("one", "two", Operation.ADD, AppLocale.EN);
        assertEquals("three", result);
    }

    @Test
    void divideOperationHandlesZeroDivision() {
        when(numberConversionService.word2number("one", AppLocale.EN)).thenReturn(1);
        when(numberConversionService.word2number("zero", AppLocale.EN)).thenReturn(0);

        assertThrows(ArithmeticException.class, () ->
                service.calculate("one", "zero", Operation.DIVIDE, AppLocale.EN));
    }
}
