package com.exemplo.usuariosimples.domain.vo;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DescricaoCurso {

    @Column(length = 180)
    private String valor;

    protected DescricaoCurso() {}

    public DescricaoCurso(String valor) {
        this.valor = valor == null ? null : valor.trim();
    }

    public String getValor() {
        return valor;
    }
}