package com.example.backend.controllers;

import com.example.backend.dto.PostCreateDTO;
import com.example.backend.dto.PostUpdateDTO;
import com.example.backend.model.post.Post;
import com.example.backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<Void> criarPost(@Valid @RequestBody PostCreateDTO dto){
        postService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{postID}")
    public ResponseEntity<Void> updatePost(@PathVariable UUID postID, @RequestBody PostUpdateDTO dto){
        postService.update(postID, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postID}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID postID){
        postService.delete(postID);
        return ResponseEntity.ok().build();
    }
}
