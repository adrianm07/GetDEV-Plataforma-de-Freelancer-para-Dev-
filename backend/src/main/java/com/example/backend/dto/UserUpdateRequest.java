package com.example.backend.dto;

import jakarta.validation.constraints.Pattern;

public record UserUpdateRequest(
        String nome,
        @Pattern(
                regexp = "^\\+?[0-9]{10,13}$",
                message = "Telefone inválido"
        )
        String telefone,
        String senha,
        String fotoUrl) {
}
