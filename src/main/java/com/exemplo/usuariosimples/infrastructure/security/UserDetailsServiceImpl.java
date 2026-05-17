package com.exemplo.usuariosimples.infrastructure.security;

import com.exemplo.usuariosimples.domain.usuario.entity.Pessoa;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.PessoaJpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final PessoaJpaRepository pessoaRepository;

    public UserDetailsServiceImpl(PessoaJpaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String emailStr) throws UsernameNotFoundException {
        Email email = new Email(emailStr);
        Pessoa pessoa = pessoaRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + emailStr));
        return new UserDetailsImpl(pessoa);
    }
}
