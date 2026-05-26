package com.exemplo.usuariosimples.domain.academico.repository;

import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.domain.academico.enums.StatusCurso;

import java.util.List;
import java.util.Optional;

public interface CursoRepository {

    Optional<Curso> findById(Long id);

    List<Curso> findByStatus(StatusCurso status);

    List<Curso> findAll();

    Curso save(Curso curso);

    void deleteById(Long id);
}
