package com.example.backend.dto;

import com.example.backend.model.user.Desenvolvedor;

import java.util.List;
import java.util.UUID;

public record DesenvolvedorResumoDTO(
        UUID id,
        String nome,
        String email,
        String telefone,
        String foto,
        List<String> skills,
        List<SummaryPostDTO> posts
) {
    public DesenvolvedorResumoDTO(Desenvolvedor dev) {
        this(
                dev.getId(),
                dev.getNome(),
                dev.getEmail(),
                dev.getTelefone(),
                dev.getFotoUrl(),
                dev.getTecnologias(),
                dev.getPosts().stream().map(SummaryPostDTO::fromEntity).toList()
        );
    }
}

