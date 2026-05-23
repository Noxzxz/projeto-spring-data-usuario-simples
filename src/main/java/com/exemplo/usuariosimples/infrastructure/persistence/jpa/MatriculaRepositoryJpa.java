package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import com.exemplo.usuariosimples.domain.academico.repository.MatriculaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class MatriculaRepositoryJpa implements MatriculaRepository {

    private final MatriculaJpaRepository springRepo;

    public MatriculaRepositoryJpa(MatriculaJpaRepository springRepo) {
        this.springRepo = springRepo;
    }

    @Override
    public Optional<Matricula> findById(Long id) {
        return springRepo.findById(id);
    }

    @Override
    public Matricula save(Matricula matricula) {
        return springRepo.save(matricula);
    }

    @Override
    public List<Matricula> findByAlunoId(UUID alunoId) {
        return springRepo.findByAlunoId(alunoId);
    }

    @Override
    public List<Matricula> findByCursoId(Long cursoId) {
        return springRepo.findByCursoId(cursoId);
    }

    @Override
    public Optional<Matricula> findByAlunoIdAndCursoId(UUID alunoId, Long cursoId) {
        return springRepo.findByAlunoIdAndCursoId(alunoId, cursoId);
    }

    @Override
    public List<Matricula> findAll() {
        return springRepo.findAll();
    }
}
