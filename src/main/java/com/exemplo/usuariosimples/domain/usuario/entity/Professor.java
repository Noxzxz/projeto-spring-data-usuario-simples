package com.exemplo.usuariosimples.domain.usuario.entity;

import com.exemplo.usuariosimples.domain.usuario.enums.PerfilUsuario;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.domain.usuario.valueobject.NomeCompleto;
import com.exemplo.usuariosimples.domain.usuario.valueobject.SenhaCriptografada;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "professor")
@PrimaryKeyJoinColumn(name = "pessoa_id")
public class Professor extends Pessoa {

    @Column(length = 100)
    private String especialidade;

    @Column(length = 255)
    private String linkLattes;

    @Column(precision = 10, scale = 2)
    private BigDecimal remuneracaoBase;

    protected Professor() {
    }

    public Professor(NomeCompleto nome, Email email, SenhaCriptografada senha,
                     boolean ativo, LocalDate dataNascimento, String especialidade) {
        super(nome, email, senha, ativo, dataNascimento, PerfilUsuario.PROFESSOR);
        this.especialidade = especialidade;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getLinkLattes() {
        return linkLattes;
    }

    public void setLinkLattes(String linkLattes) {
        this.linkLattes = linkLattes;
    }

    public BigDecimal getRemuneracaoBase() {
        return remuneracaoBase;
    }

    public void setRemuneracaoBase(BigDecimal remuneracaoBase) {
        this.remuneracaoBase = remuneracaoBase;
    }
}
