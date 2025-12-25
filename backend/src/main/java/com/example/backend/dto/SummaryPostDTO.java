package com.example.backend.dto;

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
}
