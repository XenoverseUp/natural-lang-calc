package com.xenoverseup.natural_calculator.util.number;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

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

    private static final Map<String, Integer> UNIT_MAP = new HashMap<>();
    private static final Map<String, Integer> TENS_MAP = new HashMap<>();
    private static final Map<String, Integer> MULTIPLIERS = new HashMap<>();

    static {
        for (int i = 0; i < UNITS.length; i++) UNIT_MAP.put(UNITS[i], i);
        for (int i = 1; i < TENS.length; i++) TENS_MAP.put(TENS[i], i * 10);

        MULTIPLIERS.put("yüz", 100);
        MULTIPLIERS.put("bin", 1000);
        MULTIPLIERS.put("milyon", 1_000_000);
        MULTIPLIERS.put("trilyon", 1_000_000_000);
    }



    @Override
    public String stringify(Integer number) {
        if (number == null) return null;
        return recurringStringify(number);
    }

    private String recurringStringify(int number) {
        if (number < 0) return "eksi " + recurringStringify(-number);

        if (number < 10) return UNITS[number];

        if (number < 100) {
            int tens = number / 10;
            int units = number % 10;
            return TENS[tens] + (units != 0 ? " " + recurringStringify(units) : "");
        }

        if (number < 1000) return buildMultiplierString(
                number,
                100,
                "yüz",
                true
        );

        if (number < 1_000_000) return buildMultiplierString(
                number,
                1000,
                "bin",
                true
        );

        if (number < 1_000_000_000) return buildMultiplierString(
                number,
                1_000_000,
                "milyon",
                false
        );

        return buildMultiplierString(
                number,
                1_000_000_000,
                "trilyon",
                false
        );
    }

    private String buildMultiplierString(
            int number,
            int multiplier,
            String unit,
            boolean ignoreLeadingOne
    ) {
        int fullPart = number / multiplier;
        int remainder = number % multiplier;

        String head = recurringStringify(fullPart);
        String tail = remainder != 0 ? " " + recurringStringify(remainder) : "";

        if (ignoreLeadingOne && head.equals("bir")) return  String.format("%s%s", unit, tail);

        return String.format("%s %s%s", head, unit, tail);
    }

    @Override
    public Integer parse(String numberText) throws IllegalArgumentException {
        if (numberText == null || numberText.isBlank()) return 0;

        String text = numberText.toLowerCase().trim();
        if (text.startsWith("eksi ")) return -parse(text.substring(5));

        String[] words = text.split("\\s+");
        int total = 0;
        int current = 0;

        for (String word : words) {
            if (UNIT_MAP.containsKey(word))
                current += UNIT_MAP.get(word);
            else if (TENS_MAP.containsKey(word))
                current += TENS_MAP.get(word);
            else if (MULTIPLIERS.containsKey(word)) {
                int multiplier = MULTIPLIERS.get(word);

                if (word.equals("yüz")) {
                    if (current == 0) current = 1;
                    current *= multiplier;
                } else {
                    if (current == 0) current = 1;
                    current *= multiplier;
                    total += current;
                    current = 0;
                }
            } else
                throw new IllegalArgumentException("Invalid number word: " + word);

        }

        return total + current;
    }

}
