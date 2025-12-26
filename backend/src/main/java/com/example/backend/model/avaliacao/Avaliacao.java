package com.example.backend.model.avaliacao;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Avaliacao {

    @Column(name = "nota")
    private Integer nota;

    @Column(name = "comentario")
    private String comentario;
}
