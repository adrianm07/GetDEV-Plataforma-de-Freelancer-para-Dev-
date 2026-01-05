package com.example.backend.dto;

import com.example.backend.model.enums.StatusSolicitacao;
import com.example.backend.model.solicitacao.Solicitacao;

import java.util.Date;
import java.util.UUID;

public record SolicitacaoResponseDTO(
        UUID id,
        UUID postID,
        String postTitulo,
        StatusSolicitacao status,
        Date dataCriacao
) {
    public SolicitacaoResponseDTO(Solicitacao solicitacao){
        this(
                solicitacao.getId(),
                solicitacao.getPost().getId(),
                solicitacao.getPost().getTitulo(),
                solicitacao.getStatus(),
                solicitacao.getDataCriacao());
    }
}
