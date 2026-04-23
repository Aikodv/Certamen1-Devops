package com.example.morty.services;

import com.example.morty.model.Personaje;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PersonajesService {

    @Value("${ENDPOINT_PERSONAJES:https://rickandmortyapi.com/api/character}")
    private String endpoint;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Personaje> getPersonajes() {
        Map<String, Object> response = restTemplate.getForObject(endpoint, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        return results.stream().map(p -> new Personaje(
                (String) p.get("name"),
                (String) p.get("status"),
                (String) p.get("image")
        )).collect(Collectors.toList());
    }
}
