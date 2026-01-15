package com.example.backend.dto;

import com.example.backend.model.enums.StatusSolicitacao;
import com.example.backend.model.solicitacao.Solicitacao;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public record SolicitacaoResponseDTO(
        UUID id,
        StatusSolicitacao status,
        Date dataCriacao,

        String postTitulo,
        String tecnologias,

        String contratanteNome,
        String contratanteEmail,
        String contratanteTelefone,
        String contratanteFoto,

        DesenvolvedorResumoDTO desenvolvedor
) {
    public SolicitacaoResponseDTO(Solicitacao solicitacao) {
        this(
                solicitacao.getId(),
                solicitacao.getStatus(),
                solicitacao.getDataCriacao(),

                solicitacao.getPost().getTitulo(),
                solicitacao.getPost().getTecnologias(),

                solicitacao.getPost().getContratante().getNome(),
                solicitacao.getPost().getContratante().getEmail(),
                solicitacao.getPost().getContratante().getTelefone(),
                solicitacao.getPost().getContratante().getFotoUrl(),

                solicitacao.getDesenvolvedor() != null
                        ? new DesenvolvedorResumoDTO(solicitacao.getDesenvolvedor())
                        : null
        );
    }
}




