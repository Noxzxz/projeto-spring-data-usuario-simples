package com.exemplo.usuariosimples.domain.usuario.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record NomeCompleto(
        @Column(name = "nome", nullable = false, length = 100)
        String valor
) {
    public NomeCompleto {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException("Nome não pode ser vazio");
        }
    }
}
