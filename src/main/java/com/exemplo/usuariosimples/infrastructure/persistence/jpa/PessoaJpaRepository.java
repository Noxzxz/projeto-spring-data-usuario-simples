package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.usuario.entity.Pessoa;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PessoaJpaRepository extends JpaRepository<Pessoa, UUID> {

    Optional<Pessoa> findByEmail(Email email);
}
