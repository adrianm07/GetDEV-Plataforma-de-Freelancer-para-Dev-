package com.example.backend.dto;

import com.example.backend.model.enums.TipoUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record UserRegisterRequest(
        UUID id,

        @NotBlank (message = "Nome é obrigatório")
        String nome,

        @NotBlank (message = "Senha é obrigatória")
        String senha,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido!")
        String email,

        @NotBlank(message = "Telefone é obrigatório")
        @Pattern(
                regexp = "^\\+?[0-9]{10,13}$",
                message = "Telefone inválido"
        )
        String telefone,
        String foto_url,

        @NotBlank(message = "Tipo é obrigatório")
        TipoUsuario tipoUsuario) {
}
