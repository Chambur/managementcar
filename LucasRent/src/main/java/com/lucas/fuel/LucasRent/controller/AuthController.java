package com.lucas.fuel.LucasRent.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AuthController {

    @PostMapping("/api/login")
    public ResponseEntity<String> login(Principal principal) {
        return ResponseEntity.ok().body("Login successful");
    }
} 