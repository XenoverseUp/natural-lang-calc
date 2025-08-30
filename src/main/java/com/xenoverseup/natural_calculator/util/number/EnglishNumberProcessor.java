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

        if (number < 1000) return buildMultiplierString(number, 100, "hundred");
        if (number < 1_000_000) return buildMultiplierString(number, 1000, "thousand");
        if (number < 1_000_000_000) return buildMultiplierString(number, 1_000_000, "million");

        return buildMultiplierString(number, 1_000_000_000, "trillion");
    }

    private String buildMultiplierString(int number, int multiplier, String unit) {
        int fullPart = number / multiplier;
        int remainder = number % multiplier;

        String head = recurringStringify(fullPart);
        String tail = remainder != 0 ? " " + recurringStringify(remainder) : "";

        return String.format("%s %s%s", head, unit, tail);
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
                int multiplier = MULTIPLIERS.get(word);

                if (word.equals("hundred")) {
                    if (current == 0) current = 1;
                    current *= multiplier;
                } else {
                    if (current == 0) current = 1;
                    current *= multiplier;
                    total += current;
                    current = 0;
                }
            } else throw new IllegalArgumentException("Invalid number word: " + word);

        }

        return total + current;
    }
}
