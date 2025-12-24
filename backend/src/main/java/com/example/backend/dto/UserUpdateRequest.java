package com.example.backend.dto;

import jakarta.validation.constraints.Pattern;

public record UserUpdateRequest(
        String nome,
        @Pattern(
                regexp = "^\\+?[0-9]{10,13}$",
                message = "Telefone inválido"
        )
        String telefone,

        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
                message = "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número"
        )
        String senha,
        String fotoUrl,
        String tecnologias) {
}
