package com.example.backend.model.solicitacao;

import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.post.Post;
import com.example.backend.model.user.Desenvolvedor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "solicitacoes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Solicitacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "dev_id")
    private Desenvolvedor desenvolvedor;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Enumerated(EnumType.STRING)
    private StatusPost status;

    @Column(name = "data_criacao")
    private Date dataCriacao;
}
