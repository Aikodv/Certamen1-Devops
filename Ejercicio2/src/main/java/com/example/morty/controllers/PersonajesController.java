package com.example.morty.controllers;

import com.example.morty.model.Personaje;
import com.example.morty.services.PersonajesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonajesController {

    @Autowired
    private PersonajesService personajesService;

    @GetMapping("/personajes")
    public List<Personaje> getPersonajes() {
        return personajesService.getPersonajes();
    }
}
