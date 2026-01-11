package com.example.backend.dto;

import com.example.backend.model.enums.TipoUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record UserRegisterRequest(

        @NotBlank (message = "Nome é obrigatório")
        String nome,

        @NotBlank (message = "Senha é obrigatória")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
                message = "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um número"
        )
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
        String fotoUrl,

        @NotBlank(message = "Tipo é obrigatório")
        TipoUsuario tipoUsuario
)

{
}
