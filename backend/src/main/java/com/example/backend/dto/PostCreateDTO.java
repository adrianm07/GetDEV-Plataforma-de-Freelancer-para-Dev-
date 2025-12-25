package com.example.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



public record PostCreateDTO (

        @NotBlank
        String titulo,

        @NotBlank
        String resumo,

        @NotBlank
        String descricao,

        @NotBlank
        String prazo,

        @NotNull
        @Min(0)
        Integer precoMin,

        @NotNull
        @Min(0)
        Integer precoMax,

        @NotBlank
        String tecnologias
){

}
