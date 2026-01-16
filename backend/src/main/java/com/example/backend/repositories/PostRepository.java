package com.example.backend.repositories;

import com.example.backend.dto.SummaryPostDTO;
import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByStatus(StatusPost status);

    @Query("""
        SELECT DISTINCT p FROM Post p
        WHERE p.status = :status
        AND p.tecnologias LIKE CONCAT('%', :tecnologia, '%')
""")
    List<Post> findDisponiveisPorTecnologia(@Param("status")StatusPost status, @Param("tecnologia")String tecnologia);

    List<Post> findByContratanteId(UUID contratanteId);

    List<Post> findByDesenvolvedorId(UUID desenvolvedorId);
}
