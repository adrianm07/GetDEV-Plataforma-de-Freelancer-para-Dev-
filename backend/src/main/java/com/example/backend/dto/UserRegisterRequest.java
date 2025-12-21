package com.example.backend.dto;

import com.example.backend.model.enums.TipoUsuario;

import java.util.UUID;

public record UserRegisterRequest(UUID id, String nome, String senha, String email, String telefone, String foto_url, TipoUsuario tipoUsuario) {
}
