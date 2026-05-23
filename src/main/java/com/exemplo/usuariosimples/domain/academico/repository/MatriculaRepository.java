package com.exemplo.usuariosimples.domain.academico.repository;

import com.exemplo.usuariosimples.domain.academico.entity.Matricula;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MatriculaRepository {

    Optional<Matricula> findById(Long id);

    Matricula save(Matricula matricula);

    List<Matricula> findByAlunoId(UUID alunoId);

    List<Matricula> findByCursoId(Long cursoId);

    Optional<Matricula> findByAlunoIdAndCursoId(UUID alunoId, Long cursoId);

    List<Matricula> findAll();
}
