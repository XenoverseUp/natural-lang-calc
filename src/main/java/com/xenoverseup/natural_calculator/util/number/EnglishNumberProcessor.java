package com.xenoverseup.natural_calculator.util.number;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component("EN")
public final class EnglishNumberProcessor implements NumberProcessor {

    private static final String[] UNITS = {
            "zero", "one", "two", "three", "four", "five", "six", "seven",
            "eight", "nine"
    };

    private static final String[] TEENS = {
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
            "sixteen", "seventeen", "eighteen", "nineteen"
    };

    private static final String[] TENS = {
            "", "", "twenty", "thirty", "forty", "fifty",
            "sixty", "seventy", "eighty", "ninety"
    };

    private static final Map<String, Integer> UNIT_MAP = new HashMap<>();
    private static final Map<String, Integer> TEEN_MAP = new HashMap<>();
    private static final Map<String, Integer> TENS_MAP = new HashMap<>();
    private static final Map<String, Integer> MULTIPLIERS = new HashMap<>();

    static {
        for (int i = 0; i < UNITS.length; i++) UNIT_MAP.put(UNITS[i], i);
        for (int i = 0; i < TEENS.length; i++) TEEN_MAP.put(TEENS[i], 10 + i);
        for (int i = 2; i < TENS.length; i++) TENS_MAP.put(TENS[i], i * 10);

        MULTIPLIERS.put("hundred", 100);
        MULTIPLIERS.put("thousand", 1000);
        MULTIPLIERS.put("million", 1_000_000);
        MULTIPLIERS.put("billion", 1_000_000_000);
    }

    @Override
    public String stringify(Integer number) {
        if (number == null) return "";
        return recurringStringify(number);
    }

    private String recurringStringify(int number) {
        if (number < 0) return "minus " + recurringStringify(-number);

        if (number < 10) return UNITS[number];
        if (number < 20) return TEENS[number - 10];
        if (number < 100) {
            int tens = number / 10;
            int units = number % 10;
            return TENS[tens] + (units != 0 ? " " + recurringStringify(units) : "");
        }

        if (number < 1000) {
            int hundreds = number / 100;
            int remainder = number % 100;

            String head = recurringStringify(hundreds);
            String tail = remainder != 0 ? " " + recurringStringify(remainder) : "";

            return String.format("%s hundred%s", head, tail);
        }

        if (number < 1_000_000) {
            int thousands = number / 1000;
            int remainder = number % 1000;

            String head = recurringStringify(thousands);
            String tail = remainder != 0 ? " " + recurringStringify(remainder) : "";

            return String.format("%s thousand%s", head, tail);
        }

        if (number < 1_000_000_000) {
            int millions = number / 1_000_000;
            int remainder = number % 1_000_000;

            String head = recurringStringify(millions);
            String tail = remainder != 0 ? " " + recurringStringify(remainder) : "";

            return String.format("%s million%s", head, tail);
        }

        int billions = number / 1_000_000_000;
        int remainder = number % 1_000_000_000;

        String head = recurringStringify(billions);
        String tail = remainder != 0 ? " " + recurringStringify(remainder) : "";

        return String.format("%s billion%s", head, tail);
    }

    @Override
    public Integer parse(String numberText) throws IllegalArgumentException {
        if (numberText == null || numberText.isBlank()) return 0;

        String text = numberText.toLowerCase().trim();
        if (text.startsWith("minus ")) return -parse(text.substring(6));

        String[] words = text.split("\\s+");
        int total = 0;
        int current = 0;

        for (String word : words) {
            if (UNIT_MAP.containsKey(word))
                current += UNIT_MAP.get(word);
            else if (TEEN_MAP.containsKey(word))
                current += TEEN_MAP.get(word);
            else if (TENS_MAP.containsKey(word))
                current += TENS_MAP.get(word);
            else if (MULTIPLIERS.containsKey(word)) {
                if (word.equals("hundred")) {
                    current *= MULTIPLIERS.get(word);
                } else { // thousand, million, billion
                    current *= MULTIPLIERS.get(word);
                    total += current;
                    current = 0;
                }
            } else throw new IllegalArgumentException("Invalid number word: " + word);

        }

        return total + current;
    }
}
