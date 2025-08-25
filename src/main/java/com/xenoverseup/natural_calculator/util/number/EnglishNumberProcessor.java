package com.xenoverseup.natural_calculator.util.number;

import org.springframework.stereotype.Component;

@Component("EN")
public final class EnglishNumberProcessor implements NumberProcessor {
    @Override
    public String stringify(Integer number) {
        return "";
    }

    @Override
    public Integer parse(String numberText) {
        return 0;
    }
}
