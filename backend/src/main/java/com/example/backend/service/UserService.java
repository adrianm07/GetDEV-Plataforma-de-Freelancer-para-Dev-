package com.example.backend.service;

import com.example.backend.dto.SummaryPostDTO;
import com.example.backend.dto.UserRegisterRequest;
import com.example.backend.dto.UserResponseDTO;
import com.example.backend.dto.UserUpdateRequest;
import com.example.backend.exceptions.EmailJaCadastradoException;
import com.example.backend.exceptions.ForbiddenException;
import com.example.backend.model.enums.TipoUsuario;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.PostRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PostRepository postRepository;

    public UserService (UserRepository userRepository, PasswordEncoder passwordEncoder,  PostRepository postRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.postRepository = postRepository;
    }

    public void register(UserRegisterRequest request) {
        if(userRepository.existsByEmail(request.email())){
            throw new EmailJaCadastradoException("Email já cadastrado!");
        }

        User user = crateUserByTipo(request.tipoUsuario());

        user.setNome(request.nome());
        user.setEmail(request.email());
        user.setSenha(passwordEncoder.encode(request.senha()));
        user.setTelefone(request.telefone());
        user.setFotoUrl(request.fotoUrl());

        userRepository.save(user);

    }

    public void update(UUID id, UserUpdateRequest request, Authentication authentication) {
        User usuarioLogado = (User) authentication.getPrincipal();

        if(!usuarioLogado.getId().equals(id)){
            throw new ForbiddenException("Sem permissão para editar esse usuário");
        }

        User user = userRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("Usuário não encontrado"));



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
        if(request.descricao()!=null){
            user.setDescricao(request.descricao());
        }
        if(request.tecnologias()!=null){
            user.setTecnologias(request.tecnologias());
        }

        userRepository.save(user);
    }

    private User crateUserByTipo(TipoUsuario tipoUsuario) {
        return switch (tipoUsuario){
            case DESENVOLVEDOR -> new Desenvolvedor();
            case CONTRATANTE -> new Contratante();
        };
    }

    public UserResponseDTO getUser(UUID id){
        User user = userRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("Usuário nao encontrado!"));
        List<SummaryPostDTO> posts;
        if(user.getRole().equals("CONTRATANTE")) {
            posts = postRepository.findByContratanteId(user.getId()).stream().map(SummaryPostDTO::fromEntity).toList();
        }else{
            posts = postRepository.findByDesenvolvedorId(user.getId()).stream().map(SummaryPostDTO::fromEntity).toList();
        }

        return new UserResponseDTO(
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getTelefone(),
                user.getFotoUrl(),
                user.getDescricao(),
                user.getTecnologias(),
                user.getRole(),
                posts


        );

    }
}
