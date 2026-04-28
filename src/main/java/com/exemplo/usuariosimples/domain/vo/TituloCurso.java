package com.exemplo.usuariosimples.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class TituloCurso {

    @Column(nullable = false)
    private String valor;

    protected TituloCurso() {}

    public TituloCurso(String valor) {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException("Título obrigatório");
        }
        this.valor = valor.trim();
    }

    public String getValor() {
        return valor;
    }
}