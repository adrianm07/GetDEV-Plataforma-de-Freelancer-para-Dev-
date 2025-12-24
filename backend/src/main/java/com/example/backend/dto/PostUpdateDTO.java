package com.example.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PostUpdateDTO(

        String titulo,


        String resumo,


        String descricao,


        String prazo,


        @Min(0)
        Integer precoMin,


        @Min(0)
        Integer precoMax,


        String tecnologias
) {
}
