package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiService {

    @Value("${ai.api.key}")
    private String apiKey;

    public String guessCategory(String description) {
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;
            String prompt = "Categorize this expense: " + description + ". Reply ONLY with one exact word from this list: Food, Rent, Transport, Entertainment, Shopping. No punctuation, no extra words.";

            String requestBody = "{ \"contents\": [ { \"parts\": [ { \"text\": \"" + prompt + "\" } ] } ] }";

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            String responseBody = response.getBody();

            // 🕵️ SPY GLASS 1: Print exactly what Google sent back to us!
            System.out.println("\n--- NEW AI REQUEST ---");
            System.out.println("GOOGLE'S RAW ANSWER: " + responseBody);

            if (responseBody != null && responseBody.contains("\"text\":")) {
                // Smarter chopping logic
                String answer = responseBody.split("\"text\":")[1].split("\"")[1];

                // 🕵️ SPY GLASS 2: Print the single word we chopped out
                System.out.println("THE CHOPPED WORD: [" + answer.trim() + "]");

                return answer.trim();
            }
        } catch (Exception e) {
            // 🕵️ SPY GLASS 3: If it crashes, tell us exactly why!
            System.out.println("AI CRASHED BECAUSE: " + e.getMessage());
        }

        System.out.println("USING SAFETY NET -> Food");
        return "Food";
    }
}