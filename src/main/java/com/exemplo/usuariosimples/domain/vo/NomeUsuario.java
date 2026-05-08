package com.exemplo.usuariosimples.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record NomeUsuario(
        @Column(name = "nome", nullable = false, length = 100) String valor
) {
    public NomeUsuario {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException("Nome não pode ser vazio");
        }
    }
}