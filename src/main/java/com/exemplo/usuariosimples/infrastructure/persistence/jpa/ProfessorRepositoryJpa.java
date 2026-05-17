package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.usuario.entity.Professor;
import com.exemplo.usuariosimples.domain.usuario.repository.ProfessorRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public class ProfessorRepositoryJpa implements ProfessorRepository {

    private final ProfessorJpaRepository springRepo;

    public ProfessorRepositoryJpa(ProfessorJpaRepository springRepo) {
        this.springRepo = springRepo;
    }

    @Override
    public Optional<Professor> findById(UUID id) {
        return springRepo.findById(id);
    }

    @Override
    public Professor save(Professor professor) {
        return springRepo.save(professor);
    }
}
