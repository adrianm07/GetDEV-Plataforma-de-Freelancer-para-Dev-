package com.example.backend.service;

import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.LoginResponseDTO;
import com.example.backend.exceptions.ForbiddenException;
import com.example.backend.exceptions.InvalidLoginException;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    public AuthService(AuthenticationManager authenticationManager, TokenService tokenService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {

        System.out.println("Email que chegou:" + request.email());
        System.out.println("Senha que chegou: " + request.password());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password()));

            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado!"));
            ;

            String token = tokenService.generateToken(user);

            return new LoginResponseDTO(token);
        }catch (BadCredentialsException e){
            throw new InvalidLoginException("Email ou senha inválidos!");
        }
    }

    protected Desenvolvedor getDesenvolvedorAutenticado() {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (!(user instanceof Desenvolvedor desenvolvedor)) {
            throw new ForbiddenException("Usuário não autorizado!");
        }
        return desenvolvedor;
    }
}