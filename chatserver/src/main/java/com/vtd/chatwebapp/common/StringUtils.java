package com.vtd.chatwebapp.common;

import java.text.Normalizer;
import java.util.Random;

public class StringUtils {

    public static String generateUserName(String name) {
        if(name == null) return "";
        return removeDiacritical(name.toLowerCase()).replaceAll("\\s", "") + generateRandomNumber();
    }

    public static String generateRandomNumber() {
        Random random = new Random();
        int randomNumber = random.nextInt((int) Math.pow(10, 6)) ;
        return String.valueOf(randomNumber);
    }

    private static String removeDiacritical(String name) {
        name = Normalizer.normalize(name, Normalizer.Form.NFD);
        return name.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
    }

}
