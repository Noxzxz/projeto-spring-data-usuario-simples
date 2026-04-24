package com.exemplo.usuariosimples.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record EmailUsuario(
        @Column(name = "email", nullable = false, unique = true, length = 120)
        String endereco
) {
    @Override
    public String endereco() {
        return endereco;
    }

    public EmailUsuario {
        if (endereco == null || !endereco.contains("@")) {
            throw new IllegalArgumentException("E-mail inválido");
        }
    }
}