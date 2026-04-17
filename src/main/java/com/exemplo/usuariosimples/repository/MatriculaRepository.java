package com.exemplo.usuariosimples.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.usuariosimples.domain.matriculaEntity;

public interface MatriculaRepository extends JpaRepository<matriculaEntity, Long> {
}
