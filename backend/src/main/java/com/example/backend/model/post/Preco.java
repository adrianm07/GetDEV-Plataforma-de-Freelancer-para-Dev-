package com.example.backend.model.post;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Preco {

    @Column(name = "preco_minimo")
    Integer minimo;

    @Column(name = "preco_maximo")
    Integer maximo;
}
