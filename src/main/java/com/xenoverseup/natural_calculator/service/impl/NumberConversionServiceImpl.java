package com.xenoverseup.natural_calculator.service.impl;

import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.service.NumberConversionService;
import org.springframework.stereotype.Service;


@Service
public class NumberConversionServiceImpl implements NumberConversionService {

    @Override
    public String number2word(Integer number, AppLocale appLocale) {
        return "";
    }

    @Override
    public Integer word2number(String numberText, AppLocale appLocale) {
        return 0;
    }

}
