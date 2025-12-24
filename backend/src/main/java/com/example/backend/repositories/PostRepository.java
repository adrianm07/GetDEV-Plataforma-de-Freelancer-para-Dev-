package com.example.backend.repositories;

import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByStatus(StatusPost status);
}
