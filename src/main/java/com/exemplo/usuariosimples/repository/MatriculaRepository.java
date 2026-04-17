package com.exemplo.usuariosimples.repository;

import com.exemplo.usuariosimples.domain.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
}
