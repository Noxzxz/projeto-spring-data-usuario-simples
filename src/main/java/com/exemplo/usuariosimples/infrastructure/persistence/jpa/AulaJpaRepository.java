package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.academico.entity.Aula;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AulaJpaRepository extends JpaRepository<Aula, Long> {
}
