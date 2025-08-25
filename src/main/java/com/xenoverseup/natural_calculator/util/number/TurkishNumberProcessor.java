package com.xenoverseup.natural_calculator.util.number;

import org.springframework.stereotype.Component;

@Component("TR")
public final class TurkishNumberProcessor implements NumberProcessor {

    private static final String[] UNITS = {
            "sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi",
            "sekiz", "dokuz"
    };

    private static final String[] TENS = {
            "", "on", "yirmi", "otuz", "kırk", "elli",
            "altmış", "yetmiş", "seksen", "doksan"
    };


    @Override
    public String stringify(Integer number) {
        return "";
    }

    @Override
    public Integer parse(String numberText) {
        return 0;
    }
}
