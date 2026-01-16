package com.example.backend.service;

import com.example.backend.dto.AvaliacaoDTO;
import com.example.backend.dto.SolicitacaoResponseDTO;
import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.enums.StatusSolicitacao;
import com.example.backend.model.post.Post;
import com.example.backend.model.solicitacao.Solicitacao;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.SolicitacaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository solicitacaoRepository;

    public SolicitacaoService(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
    }

    public List<SolicitacaoResponseDTO> listSolicitacoesUsuarioLogado(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        List<Solicitacao> solicitacoes;

        if (user instanceof Desenvolvedor dev) {

            solicitacoes = solicitacaoRepository
                    .findByDesenvolvedorId(dev.getId());

        } else if (user instanceof Contratante contratante) {

            solicitacoes = solicitacaoRepository
                    .findByPost_ContratanteId(contratante.getId());

        } else {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Usuário não autorizado"
            );
        }

        return solicitacoes
                .stream()
                .map(SolicitacaoResponseDTO::new)
                .toList();
    }


    public void aceitarSolicitacao(UUID solicitacaoID) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoID).orElseThrow(() -> new RuntimeException("Solicitação não encontrada!"));
        Post post = solicitacao.getPost();
        Desenvolvedor desenvolvedor = solicitacao.getDesenvolvedor();

        if(solicitacao.getStatus() == StatusSolicitacao.ACEITA){
            throw new RuntimeException("Solicitação já aceita!");
        }

        if(post.getDesenvolvedor() != null || post.getStatus() == StatusPost.OCUPADO){
            throw new RuntimeException("Post já possui Desenvolvedor aceito!");
        }

        post.setDesenvolvedor(desenvolvedor);
        post.setStatus(StatusPost.OCUPADO);
        solicitacao.setStatus(StatusSolicitacao.ACEITA);
        solicitacaoRepository.save(solicitacao);
    }

    public void recusarSolicitacao(UUID solicitacaoID){
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoID).orElseThrow(() -> new RuntimeException("Solicitação não encontrada!"));

        if(solicitacao.getStatus() == StatusSolicitacao.ACEITA){
            throw new RuntimeException("Solicitação já aceita!");
        }

        solicitacaoRepository.delete(solicitacao);
    }

}
