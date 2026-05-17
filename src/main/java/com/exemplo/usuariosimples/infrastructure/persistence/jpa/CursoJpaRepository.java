package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoJpaRepository extends JpaRepository<Curso, Long> {
}
