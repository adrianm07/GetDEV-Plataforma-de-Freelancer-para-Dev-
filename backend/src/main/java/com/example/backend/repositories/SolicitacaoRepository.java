package com.example.backend.repositories;

import com.example.backend.model.enums.StatusSolicitacao;
import com.example.backend.model.solicitacao.Solicitacao;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, UUID> {
    boolean existsByDesenvolvedorIdAndPostId(UUID devID, UUID postID);
    List<Solicitacao>findByDesenvolvedorId(UUID devID);

    long countByDesenvolvedorAndStatus(Desenvolvedor desenvolvedor, StatusSolicitacao status);
    long countByPost_ContratanteAndStatus(Contratante contratante, StatusSolicitacao status);
}
