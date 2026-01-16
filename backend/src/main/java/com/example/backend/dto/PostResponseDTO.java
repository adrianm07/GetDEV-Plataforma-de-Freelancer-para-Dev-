package com.example.backend.dto;

import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.post.Post;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.UUID;

public record PostResponseDTO(
        UUID id,
        String titulo,
        String resumo,
        String descricao,
        String prazo,
        Integer precoMin,
        Integer precoMax,
        String tecnologias,
        StatusPost status,
        Date dataCriacao,
        Date dataConclusao,
        UUID contratanteId,
        String nomeContratante,
        String fotoContratante,
        String emailContratante,
        String telContratante,
        UUID desenvolvedorId,
        String nomeDesenvolvedor,
        Integer nota,
        String comentario


) {
    public static PostResponseDTO fromEntity(Post post){
        return new PostResponseDTO(
                post.getId(),
                post.getTitulo(),
                post.getResumo(),
                post.getDescricao(),
                post.getPrazo(),
                post.getPreco().getMinimo(),
                post.getPreco().getMaximo(),
                post.getTecnologias(),
                post.getStatus(),
                post.getDataCriacao(),
                post.getDataConclusao(),
                post.getContratante().getId(),
                post.getContratante().getNome(),
                post.getContratante().getFotoUrl(),
                post.getContratante().getEmail(),
                post.getContratante().getTelefone(),
                post.getDesenvolvedor()!=null ? post.getDesenvolvedor().getId() : null,
                post.getDesenvolvedor()!=null ? post.getDesenvolvedor().getNome() : null,
                post.getAvaliacao() != null ? post.getAvaliacao().getNota() : null,
                post.getAvaliacao() != null ? post.getAvaliacao().getComentario() : null

        );
    }
}

