package com.example.backend.dto;

import com.example.backend.model.enums.StatusPost;
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
}
