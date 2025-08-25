package com.xenoverseup.natural_calculator.service.impl;

import com.xenoverseup.natural_calculator.service.NumberConversionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class NumberConversionServiceImpl implements NumberConversionService {
    @Override
    public String number2word(Integer number) {
        return "";
    }

    @Override
    public Integer word2number(String numberText) {
        return 0;
    }
}
