package com.xenoverseup.natural_calculator.service.impl;

import com.xenoverseup.natural_calculator.model.AppLocale;
import com.xenoverseup.natural_calculator.service.NumberConversionService;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
public class NumberConversionServiceImpl implements NumberConversionService {

    @Override
    public String number2word(Integer number, AppLocale appLocale) {
        return switch (appLocale) {
            case TR -> convertNumberToTurkishWords(number);
            case EN -> convertNumberToEnglishWords(number);
        };
    }

    @Override
    public Integer word2number(String numberText, AppLocale appLocale) {
        return switch (appLocale) {
            case TR -> parseTurkishNumber(numberText);
            case EN -> parseEnglishNumber(numberText);
        };
    }


    private final String[] EN_UNITS = {
            "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
    };

    private final String[] EN_TEENS = {
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
            "seventeen", "eighteen", "nineteen"
    };

    private final String[] EN_TENS = {
            "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    };

    private String convertNumberToEnglishWords(int number) throws IllegalArgumentException {
        if (number < 0) return "minus " + convertNumberToEnglishWords(-number);

        if (number < 10) return EN_UNITS[number];

        if (number < 20) return EN_TEENS[number - 10];

        if (number < 100) {
            int tensPart = number / 10;
            int unitsPart = number % 10;
            return EN_TENS[tensPart] + (unitsPart != 0 ? " " + convertNumberToEnglishWords(unitsPart) : "");
        }

        if (number < 1000) {
            int hundredsPart = number / 100;
            int remainder = number % 100;
            return convertNumberToEnglishWords(hundredsPart) + " hundred" + (remainder != 0 ? " " + convertNumberToEnglishWords(remainder) : "");
        }

        if (number < 1_000_000) { // thousands
            int thousandsPart = number / 1000;
            int remainder = number % 1000;
            return convertNumberToEnglishWords(thousandsPart) + " thousand" + (remainder != 0 ? " " + convertNumberToEnglishWords(remainder) : "");
        }

        if (number < 1_000_000_000) { // millions
            int millionsPart = number / 1_000_000;
            int remainder = number % 1_000_000;
            return convertNumberToEnglishWords(millionsPart) + " million" + (remainder != 0 ? " " + convertNumberToEnglishWords(remainder) : "");
        }

        if (number <= Integer.MAX_VALUE) { // billions
            int billionsPart = number / 1_000_000_000;
            int remainder = number % 1_000_000_000;
            return convertNumberToEnglishWords(billionsPart) + " billion" + (remainder != 0 ? " " + convertNumberToEnglishWords(remainder) : "");
        }

        throw new IllegalArgumentException("Number too large");
    }


    private String convertNumberToTurkishWords(int number) {
        return "";
    }

    private int parseEnglishNumber(String numberText) {
        String text = numberText.toLowerCase().trim();
        if (text.startsWith("minus ")) {
            return -parseEnglishNumber(text.substring(6));
        }

        Map<String, Integer> unitsMap = Map.of(
                "zero", 0, "one", 1, "two", 2, "three", 3, "four", 4,
                "five", 5, "six", 6, "seven", 7, "eight", 8, "nine", 9
        );

        Map<String, Integer> teensMap = Map.of(
                "ten", 10, "eleven", 11, "twelve", 12, "thirteen", 13, "fourteen", 14,
                "fifteen", 15, "sixteen", 16, "seventeen", 17, "eighteen", 18, "nineteen", 19
        );

        Map<String, Integer> tensMap = Map.of(
                "twenty", 20, "thirty", 30, "forty", 40, "fifty", 50,
                "sixty", 60, "seventy", 70, "eighty", 80, "ninety", 90
        );

        Map<String, Integer> multipliers = Map.of(
                "hundred", 100,
                "thousand", 1000,
                "million", 1_000_000,
                "billion", 1_000_000_000
        );

        int total = 0;
        int current = 0;

        String[] words = text.split("\\s+");
        for (String word : words) {
            if (unitsMap.containsKey(word)) {
                current += unitsMap.get(word);
            } else if (teensMap.containsKey(word)) {
                current += teensMap.get(word);
            } else if (tensMap.containsKey(word)) {
                current += tensMap.get(word);
            } else if ("hundred".equals(word)) {
                current *= 100;
            } else if (word.equals("thousand") || word.equals("million") || word.equals("billion")) {
                current *= multipliers.get(word);
                total += current;
                current = 0;
            } else {
                throw new IllegalArgumentException("Invalid word: " + word);
            }
        }

        total += current;
        return total;
    }


    private int parseTurkishNumber(String text) {
        return 0;
    }


}
