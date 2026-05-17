package com.exemplo.usuariosimples.domain.usuario.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record CarteiraDigital(
        @Column(name = "endereco_carteira", length = 255)
        String endereco,

        @Column(name = "rede_carteira", length = 50)
        String rede
) {
    public CarteiraDigital {
        if (endereco != null && endereco.isBlank()) {
            throw new IllegalArgumentException("Endereço de carteira inválido");
        }
    }
}

