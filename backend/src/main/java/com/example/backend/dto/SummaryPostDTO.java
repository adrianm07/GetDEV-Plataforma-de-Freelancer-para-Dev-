package com.example.backend.dto;

import com.example.backend.model.post.Post;

import java.util.UUID;

public record SummaryPostDTO(

        UUID id,
        String titulo,
        String resumo,
        Integer precoMIn,
        Integer precoMax,
        String tecnlogias,
        String prazo,
        String status,
        String nomeContratante
) {
    public static SummaryPostDTO fromEntity(Post post){
        return new SummaryPostDTO(
                post.getId(),
                post.getTitulo(),
                post.getResumo(),
                post.getPreco().getMinimo(),
                post.getPreco().getMaximo(),
                post.getTecnologias(),
                post.getPrazo(),
                post.getStatus().name(),
                post.getContratante().getNome()

        );
    }
}
