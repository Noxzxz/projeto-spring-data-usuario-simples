package com.exemplo.usuariosimples.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.usuariosimples.domain.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}
