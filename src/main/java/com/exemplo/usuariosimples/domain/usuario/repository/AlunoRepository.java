package com.exemplo.usuariosimples.domain.usuario.repository;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AlunoRepository {

    Optional<Aluno> findById(UUID id);

    Optional<Aluno> findByEmail(Email email);

    Aluno save(Aluno aluno);

    List<Aluno> findAllPremium();
}
