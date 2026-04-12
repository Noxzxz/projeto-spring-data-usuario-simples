package com.exemplo.usuariosimples.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "assinatura")
public class Assinatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING) // Salva o nome (BASIC/PREMIUM) em vez do índice (0,1)
    @Column(nullable = false)
    private TiposAssinatura tipo;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    public Assinatura() {
    }

    public Assinatura(TiposAssinatura tipo, LocalDate dataInicio) {
        this.tipo = tipo;
        this.dataInicio = dataInicio;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TiposAssinatura getTipo() {
        return tipo;
    }

    public void setTipo(TiposAssinatura tipo) {
        this.tipo = tipo;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Assinatura that = (Assinatura) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Assinatura{" +
                "id=" + id +
                ", tipo=" + tipo +
                ", dataInicio=" + dataInicio +
                '}';
    }
}