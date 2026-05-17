package com.exemplo.usuariosimples.infrastructure.security;

import com.exemplo.usuariosimples.domain.usuario.enums.PerfilUsuario;
import com.exemplo.usuariosimples.domain.usuario.entity.Pessoa;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class UserDetailsImpl implements UserDetails {

    private final UUID id;
    private final String email;
    private final String senha;
    private final boolean ativo;
    private final String perfil;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Pessoa pessoa) {
        this.id = pessoa.getId();
        this.email = pessoa.getEmail().endereco();
        this.senha = pessoa.getSenha().hash();
        this.ativo = pessoa.isAtivo();
        this.perfil = pessoa.getPerfil().name();
        this.authorities = List.of(new SimpleGrantedAuthority("ROLE_" + perfil));
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPerfil() {
        return perfil;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return ativo;
    }
}
