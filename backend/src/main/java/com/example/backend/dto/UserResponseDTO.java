package com.example.backend.dto;

import com.example.backend.model.enums.TipoUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;
import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String nome,
        String email,
        String telefone,
        String fotoUrl,
        List<String> tecnologias,
        String tipoUsuário
) {
}
