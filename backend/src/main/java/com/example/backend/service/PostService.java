package com.example.backend.service;

import com.example.backend.dto.PostCreateDTO;
import com.example.backend.dto.PostUpdateDTO;
import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.post.Post;
import com.example.backend.model.post.Preco;
import com.example.backend.model.solicitacao.Solicitacao;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.PostRepository;
import com.example.backend.repositories.SolicitacaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final SolicitacaoRepository solicitacaoRepository;
    private final AuthService authService;

    public PostService(PostRepository postRepository, SolicitacaoRepository solicitacaoRepository, AuthService authService) {
        this.postRepository = postRepository;
        this.solicitacaoRepository = solicitacaoRepository;
        this.authService = authService;
    }

    private Contratante getContratanteAutenticado() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!(user instanceof Contratante contratante)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Usuário não autorizado");
        }
        return contratante;
    }




    public void create(PostCreateDTO dto ) {


        Contratante contratante = getContratanteAutenticado();

        Preco preco = new Preco(dto.precoMin(),dto.precoMax());

        Post post = new Post();
        post.setTitulo(dto.titulo());
        post.setDescricao(dto.descricao());
        post.setResumo(dto.resumo());
        post.setPreco(preco);
        post.setPrazo(dto.prazo());
        post.setTecnologias(dto.tecnologias());
        post.setStatus(StatusPost.DISPONIVEL);
        post.setDataCriacao(new Date());
        post.setContratante(contratante);


        postRepository.save(post);

    }

    public void update(UUID idPost, PostUpdateDTO dto){

        Contratante contratanteLogado = getContratanteAutenticado();

        Post post = postRepository.findById(idPost).orElseThrow(()-> new RuntimeException("Post não encontrado"));

        if(!post.getContratante().getId().equals(contratanteLogado.getId())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Usario logado diferente do autor do post");
        }

        if(dto.titulo()!=null) post.setTitulo(dto.titulo());
        if(dto.resumo()!=null)post.setResumo(dto.resumo());
        if(dto.descricao()!=null)post.setDescricao(dto.descricao());
        if(dto.prazo()!=null)post.setPrazo(dto.prazo());
        if(dto.tecnologias()!=null)post.setTecnologias(dto.tecnologias());

        if(dto.precoMax()!=null || dto.precoMin()!=null){
            Preco preco = new Preco();
            if(dto.precoMax()!=null)preco.setMaximo(dto.precoMax());
            if(dto.precoMin()!=null)preco.setMinimo(dto.precoMin());
            post.setPreco(preco);
        }

        postRepository.save(post);

    }

    public void delete (UUID idPost){

        Contratante contratanteLogado = getContratanteAutenticado();

        Post post = postRepository.findById(idPost).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Post não encontrado"));

        if(!post.getContratante().getId().equals(contratanteLogado.getId())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Usuario logado diferente do autor do post");
        }

        postRepository.delete(post);

    }

    public void deleteDevAceito(UUID postID){

        Post post = postRepository.findById(postID).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Post não encontrado!"));
        Contratante contratanteLogado = getContratanteAutenticado();

        if(!post.getContratante().getId().equals(contratanteLogado.getId())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Usuario logado diferente do autor do post!");
        }

        if(post.getStatus() == StatusPost.OCUPADO){
            throw new RuntimeException("Post já concluído, não é possivel excluir o Desenvolvedor!");
        }

        post.setDesenvolvedor(null);
        post.setStatus(StatusPost.DISPONIVEL);
        postRepository.save(post);
    }

    public void registraSolicitacao(UUID postID){

        Post post = postRepository.findById(postID).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Post não encontrado"));
        Desenvolvedor desenvolvedorAutenticado = authService.getDesenvolvedorAutenticado();

        if (post.getStatus() != StatusPost.DISPONIVEL) {
            throw new RuntimeException("Post já ocupado ou concluído!");
        }

        if (solicitacaoRepository.existsByDesenvolvedorIdAndPostId(desenvolvedorAutenticado.getId(), postID)) {
            throw new RuntimeException("Já foi enviada solicitação para este post!");
        }

        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setPost(post);
        solicitacao.setDesenvolvedor(desenvolvedorAutenticado);

        solicitacaoRepository.save(solicitacao);
    }
}
