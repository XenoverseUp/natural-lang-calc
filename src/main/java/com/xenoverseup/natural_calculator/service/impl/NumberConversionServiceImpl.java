package com.xenoverseup.natural_calculator.service.impl;

import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.service.NumberConversionService;
import com.xenoverseup.natural_calculator.util.number.NumberProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
@RequiredArgsConstructor
public class NumberConversionServiceImpl implements NumberConversionService {
    private final Map<String, NumberProcessor> processors;

    @Override
    public String number2word(Integer number, AppLocale appLocale) {
        NumberProcessor processor = processors.get(appLocale.name());
        return processor.stringify(number);
    }

    @Override
    public Integer word2number(String numberText, AppLocale appLocale) {
        NumberProcessor processor = processors.get(appLocale.name());
        return processor.parse(numberText);
    }
}
