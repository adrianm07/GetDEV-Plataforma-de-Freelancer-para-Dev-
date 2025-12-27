package com.example.backend.service;

import com.example.backend.dto.SolicitacaoResponseDTO;
import com.example.backend.model.solicitacao.Solicitacao;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.SolicitacaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;

    public SolicitacaoService(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
    }

    public List<SolicitacaoResponseDTO> listSolicitacoesDev(){

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(!(user instanceof Desenvolvedor desenvolvedor)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Voce nao tem permissão para ver as solicitações");
        }

        List<Solicitacao> solicitacoes = solicitacaoRepository.findByDesenvolvedorId(desenvolvedor.getId());

        return solicitacoes.stream().map(SolicitacaoResponseDTO::new).toList();

    }
}
