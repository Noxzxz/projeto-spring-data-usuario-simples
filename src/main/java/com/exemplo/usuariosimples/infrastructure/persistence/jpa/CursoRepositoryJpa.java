package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.domain.academico.enums.StatusCurso;
import com.exemplo.usuariosimples.domain.academico.repository.CursoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CursoRepositoryJpa implements CursoRepository {

    private final CursoJpaRepository springRepo;

    public CursoRepositoryJpa(CursoJpaRepository springRepo) {
        this.springRepo = springRepo;
    }

    @Override
    public Optional<Curso> findById(Long id) {
        return springRepo.findById(id);
    }

    @Override
    public List<Curso> findByStatus(StatusCurso status) {
        return springRepo.findAll().stream()
                .filter(c -> c.getStatus() == status)
                .toList();
    }

    @Override
    public List<Curso> findAll() {
        return springRepo.findAll();
    }

    @Override
    public Curso save(Curso curso) {
        return springRepo.save(curso);
    }

    @Override
    public void deleteById(Long id) {
        springRepo.deleteById(id);
    }
}
