package com.example.backend.model.post;

import com.example.backend.model.avaliacao.Avaliacao;
import com.example.backend.model.enums.StatusPost;
import com.example.backend.model.solicitacao.Solicitacao;
import com.example.backend.model.user.Contratante;
import com.example.backend.model.user.Desenvolvedor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String titulo;
    private String resumo;
    private String descricao;
    private String prazo;

    @Column(name = "data_criacao")
    private Date dataCriacao;

    @Column(name = "data_conclusao")
    private Date dataConclusao;

    @Embedded
    private Preco preco;

    private String tecnologias;

    @Enumerated(EnumType.STRING)
    private StatusPost status;

    @Embedded
    private Avaliacao avaliacao;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Solicitacao> solicitacoes;

    @ManyToOne
    @JoinColumn(name = "contratante_id")
    private Contratante contratante;

    @ManyToOne
    @JoinColumn(name = "desenvolvedor_id")
    private Desenvolvedor desenvolvedor;
}
