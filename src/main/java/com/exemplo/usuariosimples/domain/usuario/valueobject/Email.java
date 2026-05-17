package com.exemplo.usuariosimples.domain.usuario.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record Email(
        @Column(name = "email", nullable = false, unique = true, length = 120)
        String endereco
) {
    public Email {
        if (endereco == null || !endereco.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new IllegalArgumentException("E-mail inválido");
        }
    }
}
