package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.usuario.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface ProfessorJpaRepository extends JpaRepository<Professor, UUID> {
}
