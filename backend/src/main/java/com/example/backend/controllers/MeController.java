package com.example.backend.controllers;

import com.example.backend.dto.UserMeResponse;
import com.example.backend.model.user.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/me")
public class MeController {

    public MeController() {

    }

    @GetMapping
    public UserMeResponse getLoggedUser(Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        return new UserMeResponse(
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getRole(),
                user.getFotoUrl()
        );
    }

}