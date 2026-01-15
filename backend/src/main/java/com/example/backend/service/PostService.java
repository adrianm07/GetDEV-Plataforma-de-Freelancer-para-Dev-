package com.example.backend.service;

import com.example.backend.dto.AvaliacaoDTO;
import com.example.backend.dto.PostCreateDTO;
import com.example.backend.dto.PostUpdateDTO;
import com.example.backend.dto.SummaryPostDTO;
import com.example.backend.model.avaliacao.Avaliacao;
import com.example.backend.dto.*;
import com.example.backend.model.avaliacao.Avaliacao;
import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.enums.StatusSolicitacao;
import com.example.backend.model.enums.Tecnologia;
import com.example.backend.model.post.Post;
import com.example.backend.model.post.Preco;
import com.example.backend.model.solicitacao.Solicitacao;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import com.example.backend.model.user.User;
import com.example.backend.repositories.PostRepository;
import com.example.backend.repositories.SolicitacaoRepository;
import com.example.backend.repositories.UserRepository;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final SolicitacaoRepository solicitacaoRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, SolicitacaoRepository solicitacaoRepository, AuthService authService, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.solicitacaoRepository = solicitacaoRepository;
        this.authService = authService;
        this.userRepository = userRepository;
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

    public List<SummaryPostDTO> listarPostsDisponiveis(){

        List<Post> posts = postRepository.findByStatus(StatusPost.DISPONIVEL);

        return posts.stream().map(post -> new SummaryPostDTO(
            post.getId(),
            post.getTitulo(),
            post.getResumo(),
            post.getPreco().getMinimo(),
            post.getPreco().getMaximo(),
            post.getTecnologias(),
            post.getPrazo(),
            post.getStatus().name(),
                post.getContratante().getNome()
        )).toList();
    }

    public PostResponseDTO buscarPost(UUID idPost){
        Post post = postRepository.findById(idPost).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Post não encontrado"));

        return new PostResponseDTO(
                post.getId(),
                post.getTitulo(),
                post.getResumo(),
                post.getDescricao(),
                post.getPrazo(),
                post.getPreco().getMinimo(),
                post.getPreco().getMaximo(),
                post.getTecnologias(),
                post.getStatus(),
                post.getDataCriacao(),
                post.getDataConclusao(),
                post.getContratante().getId(),
                post.getContratante().getNome(),
                post.getContratante().getFotoUrl(),
                post.getContratante().getEmail(),
                post.getContratante().getTelefone(),
                post.getDesenvolvedor()!=null ? post.getDesenvolvedor().getId() : null
        );

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
            throw new ResponseStatusException (HttpStatus.CONFLICT,"Já foi enviada solicitação para este post!");
        }

        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setPost(post);
        solicitacao.setDesenvolvedor(desenvolvedorAutenticado);
        solicitacao.setDataCriacao(new Date());
        solicitacao.setStatus(StatusSolicitacao.PENDENTE);

        solicitacaoRepository.save(solicitacao);
    }

    public void concluirPost(UUID idPost){

        User usuarioLogado = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Post post = postRepository.findById(idPost).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Post nao encontrado"));

        if(post.getDesenvolvedor()==null){
            throw new RuntimeException("Post nao possui desenvolvedor aceito");
        }

        boolean isContratanteAutor = usuarioLogado instanceof Contratante && post.getContratante().getId().equals(usuarioLogado.getId());
        boolean isDevResponsavel = usuarioLogado instanceof Desenvolvedor && post.getDesenvolvedor().getId().equals(usuarioLogado.getId());

        if(!isContratanteAutor && !isDevResponsavel){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vocẽ nao tem permissão para concluir o post");
        }

        post.setStatus(StatusPost.CONCLUIDO);
        post.setDataConclusao(new Date());

        postRepository.save(post);

    }

    public List<SummaryPostDTO> listarComFiltro(List<String> tecnologias){
        List<Post> posts;
        if(tecnologias==null || tecnologias.isEmpty()){
            posts = postRepository.findByStatus(StatusPost.DISPONIVEL);
        }else{
            Set<Post> resultado = new HashSet<>();

            for(String tech:tecnologias){
                resultado.addAll(
                        postRepository.findDisponiveisPorTecnologia(StatusPost.DISPONIVEL, tech)
                );
            }

            posts = new ArrayList<>(resultado);

        }

        return posts.stream().map(SummaryPostDTO::fromEntity).toList();
    }

    public List<SummaryPostDTO> listarMeusPosts(){
        List<Post> posts;
        String email = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        posts = postRepository.findByContratanteId(user.getId());
        return posts.stream().map(SummaryPostDTO::fromEntity).toList();
    }


    public void registraAvaliacao(UUID postID,  AvaliacaoDTO avaliacaoDTO){

        Post post = postRepository.findById(postID).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Post não encontrado!"));
        Contratante contratanteLogado = getContratanteAutenticado();

        if(!post.getContratante().getId().equals(contratanteLogado.getId())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Usuario logado diferente do autor do post!");
        }

        if(post.getStatus() != StatusPost.OCUPADO){
            throw new RuntimeException("Post ainda não concluído!");
        }
        if(post.getDesenvolvedor() == null){
            throw new RuntimeException("Não existe Desenvolvedor para avaliar!");
        }
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setNota(avaliacaoDTO.nota());
        avaliacao.setComentario(avaliacaoDTO.comentario());
        post.setAvaliacao(avaliacao);
        postRepository.save(post);
    }
}
