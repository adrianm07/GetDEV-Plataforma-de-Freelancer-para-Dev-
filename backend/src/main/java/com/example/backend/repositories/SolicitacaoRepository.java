package com.example.backend.repositories;

import com.example.backend.model.solicitacao.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, UUID> {
    boolean existsByDesenvolvedorIdAndPostId(UUID devID, UUID postID);
    List<Solicitacao>findByDesenvolvedorId(UUID devID);
}
