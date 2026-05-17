package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatriculaJpaRepository extends JpaRepository<Matricula, Long> {
}
