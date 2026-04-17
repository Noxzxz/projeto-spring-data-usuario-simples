package com.exemplo.usuariosimples.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.usuariosimples.domain.Matricula;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
}
