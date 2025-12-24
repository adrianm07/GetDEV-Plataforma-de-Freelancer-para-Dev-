package com.example.backend.service;

import com.example.backend.dto.UserRegisterRequest;
import com.example.backend.dto.UserUpdateRequest;
import com.example.backend.model.enums.TipoUsuario;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService (UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(UserRegisterRequest request) {
        if(userRepository.existsByEmail(request.email())){
            throw new RuntimeException("Email ja cadastrado");
        }

        User user = crateUserByTipo(request.tipoUsuario());

        user.setNome(request.nome());
        user.setEmail(request.email());
        user.setSenha(passwordEncoder.encode(request.senha()));
        user.setTelefone(request.telefone());
        user.setFotoUrl(request.fotoUrl());

        //System.out.println("FOto recbida" + request.fotoUrl());

        userRepository.save(user);

    }

    public void update(UUID id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow(()-> new RuntimeException("Usuário não encontrado"));
        if(request.nome()!=null){
            user.setNome(request.nome());
        }
        if(request.telefone()!=null){
            user.setTelefone(request.telefone());
        }
        if(request.fotoUrl()!=null){
            user.setFotoUrl(request.fotoUrl());
        }
        if(request.senha()!=null){
            user.setSenha(passwordEncoder.encode(request.senha()));
        }
        userRepository.save(user);
    }

    private User crateUserByTipo(TipoUsuario tipoUsuario) {
        return switch (tipoUsuario){
            case DESENVOLVEDOR -> new Desenvolvedor();
            case CONTRATANTE -> new Contratante();
        };
    }
}
