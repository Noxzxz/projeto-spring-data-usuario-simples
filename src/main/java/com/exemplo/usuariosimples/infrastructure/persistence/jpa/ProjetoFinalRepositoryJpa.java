package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.academico.entity.ProjetoFinal;
import com.exemplo.usuariosimples.domain.academico.enums.StatusProjeto;
import com.exemplo.usuariosimples.domain.academico.repository.ProjetoFinalRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProjetoFinalRepositoryJpa implements ProjetoFinalRepository {

    private final ProjetoFinalJpaRepository springRepo;

    public ProjetoFinalRepositoryJpa(ProjetoFinalJpaRepository springRepo) {
        this.springRepo = springRepo;
    }

    @Override
    public Optional<ProjetoFinal> findById(Long id) {
        return springRepo.findById(id);
    }

    @Override
    public ProjetoFinal save(ProjetoFinal projetoFinal) {
        return springRepo.save(projetoFinal);
    }

    @Override
    public List<ProjetoFinal> findByMatriculaId(Long matriculaId) {
        return springRepo.findByMatriculaId(matriculaId);
    }

    @Override
    public List<ProjetoFinal> findByAulaId(Long aulaId) {
        return springRepo.findByAulaId(aulaId);
    }
}
