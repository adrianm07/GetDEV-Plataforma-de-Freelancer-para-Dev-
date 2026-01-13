package com.example.backend.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_usuario", discriminatorType = DiscriminatorType.STRING)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String descricao;

    @Column(name = "foto_url")
    private String fotoUrl;


    private String tecnologias;

    @Transient
    public String getRole() {
        return this.getClass().getSimpleName().toUpperCase();
    }

    @Transient
    public List<String> getTecnologias() {
        if(this.tecnologias!=null) {
            return new ArrayList<>(List.of(this.tecnologias.split(",")));
        }
        return List.of();
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", role=" + getRole()+
                '}';
    }

}
