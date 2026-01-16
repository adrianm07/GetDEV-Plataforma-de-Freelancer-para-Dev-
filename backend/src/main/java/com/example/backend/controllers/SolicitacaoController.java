package com.example.backend.controllers;

import com.example.backend.dto.SolicitacaoResponseDTO;
import com.example.backend.model.enums.StatusSolicitacao;
import com.example.backend.model.enums.TipoUsuario;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.SolicitacaoRepository;
import com.example.backend.service.SolicitacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/solicitacoes")

public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;
    private final SolicitacaoRepository solicitacaoRepository;

    public SolicitacaoController(SolicitacaoService solicitacaoService, SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoService = solicitacaoService;
        this.solicitacaoRepository = solicitacaoRepository;
    }

    @GetMapping("/enviadas")
    public ResponseEntity<List<SolicitacaoResponseDTO>>listSolicitacoesUsuario(Authentication authentication) {
        return ResponseEntity.ok(solicitacaoService.listSolicitacoesUsuarioLogado(authentication));
    }

    @GetMapping("/pending-count")
    public Map<String, Long> getPendingCount(Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        long count;

        if (user instanceof Desenvolvedor dev) {
            count = solicitacaoRepository.countByDesenvolvedorAndStatus(
                    dev,
                    StatusSolicitacao.PENDENTE
            );
        } else if (user instanceof Contratante contratante) {
            count = solicitacaoRepository.countByPost_ContratanteAndStatus(
                    contratante,
                    StatusSolicitacao.PENDENTE
            );
        } else {
            count = 0;
        }

        return Map.of("count", count);
    }


}

