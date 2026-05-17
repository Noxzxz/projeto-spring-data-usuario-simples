package com.exemplo.usuariosimples.domain.usuario.entity;

import com.exemplo.usuariosimples.domain.usuario.enums.PerfilUsuario;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.domain.usuario.valueobject.NomeCompleto;
import com.exemplo.usuariosimples.domain.usuario.valueobject.SenhaCriptografada;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "administrador")
@PrimaryKeyJoinColumn(name = "pessoa_id")
public class Administrador extends Pessoa {

    @Column(nullable = false)
    private int nivelAcesso;

    protected Administrador() {
    }

    public Administrador(NomeCompleto nome, Email email, SenhaCriptografada senha,
                         boolean ativo, LocalDate dataNascimento, int nivelAcesso) {
        super(nome, email, senha, ativo, dataNascimento, PerfilUsuario.ADMINISTRADOR);
        this.nivelAcesso = nivelAcesso;
    }

    public int getNivelAcesso() {
        return nivelAcesso;
    }

    public void setNivelAcesso(int nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }
}
