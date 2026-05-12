package com.exemplo.usuariosimples.domain;

import com.exemplo.usuariosimples.domain.vo.NomeUsuario;
import com.exemplo.usuariosimples.domain.vo.EmailUsuario;
import com.exemplo.usuariosimples.domain.vo.SenhaCriptografada;
import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private NomeUsuario nome;
    @Embedded
    private EmailUsuario email;
    @Embedded
    private SenhaCriptografada senha;

    @Column(nullable = false)
    private boolean ativo = true; // Valor padrão comum

    protected Usuario() { }

    public Usuario(NomeUsuario nome, EmailUsuario email, SenhaCriptografada senha, boolean ativo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
    }

    // Getters Públicos
    public Long getId() { return id; }
    public NomeUsuario getNome() { return nome; }
    public EmailUsuario getEmail() { return email; }
    public SenhaCriptografada getSenha() { return senha; }
    public boolean isAtivo() { return ativo; }

    // Setters e Métodos de Negócio
    public void setAtivo(boolean ativo) { this.ativo = ativo; }

    // Metodo de Negócio para Atualização (Substituindo o objeto inteiro)
    public void alterarPerfil(NomeUsuario novoNome, EmailUsuario novoEmail) {
        if (novoNome == null || novoEmail == null) {
            throw new IllegalArgumentException("Dados de perfil não podem ser nulos");
        }
        this.nome = novoNome;
        this.email = novoEmail;
    }

    public void setSenha(SenhaCriptografada novaSenha) {
        if (novaSenha == null) throw new IllegalArgumentException("A senha não pode ser nula");
        this.senha = novaSenha;
    }
}