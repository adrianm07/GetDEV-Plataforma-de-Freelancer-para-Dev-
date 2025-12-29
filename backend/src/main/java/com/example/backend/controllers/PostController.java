package com.example.backend.controllers;

import com.example.backend.dto.PostCreateDTO;
import com.example.backend.dto.PostResponseDTO;
import com.example.backend.dto.PostUpdateDTO;
import com.example.backend.dto.SummaryPostDTO;
import com.example.backend.dto.SolicitacaoRequestDTO;
import com.example.backend.dto.SummaryPostDTO;
import com.example.backend.model.enums.Tecnologia;
import com.example.backend.model.post.Post;
import com.example.backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PreAuthorize("hasRole('CONTRATANTE')")
    @PostMapping
    public ResponseEntity<Void> criarPost(@Valid @RequestBody PostCreateDTO dto){
        postService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

//    @PreAuthorize("hasRole('CONTRATANTE')")
//    @GetMapping
//    public ResponseEntity<List<SummaryPostDTO>>listarPosts(){
//        return ResponseEntity.ok(postService.listarPostsDisponiveis());
//    }

    @GetMapping("/{postID}")
    public ResponseEntity<PostResponseDTO> buscarPost(@PathVariable UUID postID){
        return ResponseEntity.ok(postService.buscarPost(postID));
    }

    @PreAuthorize("hasRole('CONTRATANTE')")
    @PutMapping("/{postID}")
    public ResponseEntity<Void> updatePost(@PathVariable UUID postID, @RequestBody PostUpdateDTO dto){
        postService.update(postID, dto);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('CONTRATANTE')")
    @DeleteMapping("/{postID}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID postID){
        postService.delete(postID);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('CONTRATANTE')")
    @PatchMapping("/{postID}")
    public ResponseEntity<Void> deleteDevAceito(@PathVariable UUID postID){

        postService.deleteDevAceito(postID);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('DESENVOLVEDOR')")
    @PostMapping("{postID}/solicitacoes")
    public ResponseEntity<Void> enviarSolicitacao(@PathVariable UUID postID){

        postService.registraSolicitacao(postID);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{postID}/concluir")
    public ResponseEntity<Void> concluirPost(@PathVariable UUID postID){
        postService.concluirPost(postID);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SummaryPostDTO>> listar(@RequestParam(required = false)List<String> tecnologias){
        List<SummaryPostDTO> posts = postService.listarComFiltro(tecnologias);
        return ResponseEntity.ok(posts);
    }


}
