package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.enums.TipoPlano;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

interface AlunoJpaRepository extends JpaRepository<Aluno, UUID> {

    Optional<Aluno> findByEmail(Email email);

    List<Aluno> findByTipoPlano(TipoPlano tipoPlano);
}
