package com.exemplo.usuariosimples.domain.usuario.repository;

import com.exemplo.usuariosimples.domain.usuario.entity.Professor;

import java.util.Optional;
import java.util.UUID;

public interface ProfessorRepository {

    Optional<Professor> findById(UUID id);

    Professor save(Professor professor);
}
