package com.example.backend.model.user;

import com.example.backend.model.post.Post;
import com.example.backend.model.solicitacao.Solicitacao;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@DiscriminatorValue("DESENVOLVEDOR")
public class Desenvolvedor extends User {

    @OneToMany(mappedBy = "desenvolvedor")
    private List<Post> posts;

    @OneToMany(mappedBy = "desenvolvedor", cascade = CascadeType.ALL)
    private List<Solicitacao> solicitacoes;



}
