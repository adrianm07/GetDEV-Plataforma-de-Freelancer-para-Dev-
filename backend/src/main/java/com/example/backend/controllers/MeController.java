package com.example.backend.controllers;

import com.example.backend.dto.UserMeResponse;
import com.example.backend.model.user.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/me")
public class MeController {

    private final UserRepository userRepository;

    public MeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public UserMeResponse getLoggedUser(Authentication authentication) {
        //String email = authentication.getName();
        //User user = userRepository.findByEmail(email)
               // .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
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