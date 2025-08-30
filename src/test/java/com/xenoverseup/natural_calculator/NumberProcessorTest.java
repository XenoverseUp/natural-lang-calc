package com.xenoverseup.natural_calculator;

import com.xenoverseup.natural_calculator.util.number.EnglishNumberProcessor;
import com.xenoverseup.natural_calculator.util.number.TurkishNumberProcessor;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NumberProcessorTest {

    private final EnglishNumberProcessor enProcessor = new EnglishNumberProcessor();
    private final TurkishNumberProcessor trProcessor = new TurkishNumberProcessor();

    @Test
    void englishStringifyAndParse() {
        assertEquals(42, enProcessor.parse("forty two"));
        assertEquals("forty two", enProcessor.stringify(42));
        assertEquals(-15, enProcessor.parse("minus fifteen"));
        assertEquals("minus fifteen", enProcessor.stringify(-15));
    }

    @Test
    void turkishStringifyAndParse() {
        assertEquals(42, trProcessor.parse("kırk iki"));
        assertEquals("kırk iki", trProcessor.stringify(42));
        assertEquals(-15, trProcessor.parse("eksi on beş"));
        assertEquals("eksi on beş", trProcessor.stringify(-15));
    }

    @Test
    void invalidWordThrowsException() {
        assertThrows(IllegalArgumentException.class, () -> enProcessor.parse("invalidword"));
        assertThrows(IllegalArgumentException.class, () -> trProcessor.parse("yanlışkelime"));
    }
}
