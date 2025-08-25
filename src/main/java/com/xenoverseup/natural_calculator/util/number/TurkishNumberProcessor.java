package com.xenoverseup.natural_calculator.util.number;

import org.springframework.stereotype.Component;

@Component("TR")
public final class TurkishNumberProcessor implements NumberProcessor {
    @Override
    public String stringify(Integer number) {
        return "";
    }

    @Override
    public Integer parse(String numberText) {
        return 0;
    }
}
