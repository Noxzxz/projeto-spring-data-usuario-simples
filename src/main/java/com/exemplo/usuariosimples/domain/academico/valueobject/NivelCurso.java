package com.exemplo.usuariosimples.domain.academico.valueobject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public record NivelCurso(
        @Column(name = "nivel", length = 30) String valor) {
    public NivelCurso {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException("Nível não pode ser vazio");
        }
    }
}
