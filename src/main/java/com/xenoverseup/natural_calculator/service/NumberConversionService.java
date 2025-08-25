package com.xenoverseup.natural_calculator.service;

import com.xenoverseup.natural_calculator.model.AppLocale;

public interface NumberConversionService {
    public String number2word(Integer number, AppLocale appLocale);
    public Integer word2number(String numberText, AppLocale appLocale);
}
