package com.exemplo.usuariosimples.domain.usuario.entity;

import com.exemplo.usuariosimples.domain.usuario.enums.PerfilUsuario;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.domain.usuario.valueobject.NomeCompleto;
import com.exemplo.usuariosimples.domain.usuario.valueobject.SenhaCriptografada;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "pessoa")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Embedded
    private NomeCompleto nome;

    @Embedded
    private Email email;

    @Embedded
    private SenhaCriptografada senha;

    @Column(nullable = false)
    private boolean ativo;

    @Column(nullable = true)
    private LocalDate dataNascimento;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PerfilUsuario perfil;

    protected Pessoa() {
    }

    public Pessoa(NomeCompleto nome, Email email, SenhaCriptografada senha,
                  boolean ativo, LocalDate dataNascimento, PerfilUsuario perfil) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = LocalDateTime.now();
        this.perfil = perfil;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public NomeCompleto getNome() {
        return nome;
    }

    public void setNome(NomeCompleto nome) {
        this.nome = nome;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public SenhaCriptografada getSenha() {
        return senha;
    }

    public void setSenha(SenhaCriptografada senha) {
        this.senha = senha;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public PerfilUsuario getPerfil() {
        return perfil;
    }

    public void setPerfil(PerfilUsuario perfil) {
        this.perfil = perfil;
    }
}
