package com.exemplo.usuariosimples.domain.usuario.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record SenhaCriptografada(
        @Column(name = "senha", nullable = false, length = 60)
        String hash
) {
    public SenhaCriptografada {
        if (hash == null || hash.isBlank()) {
            throw new IllegalArgumentException("A senha não pode ser vazia");
        }
    }
}
