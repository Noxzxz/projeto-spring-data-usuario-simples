package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.repository.AlunoRepository;
import com.exemplo.usuariosimples.domain.usuario.enums.TipoPlano;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class AlunoRepositoryJpa implements AlunoRepository {

    private final AlunoJpaRepository springRepo;

    public AlunoRepositoryJpa(AlunoJpaRepository springRepo) {
        this.springRepo = springRepo;
    }

    @Override
    public Optional<Aluno> findById(UUID id) {
        return springRepo.findById(id);
    }

    @Override
    public Optional<Aluno> findByEmail(Email email) {
        return springRepo.findByEmail(email);
    }

    @Override
    public Aluno save(Aluno aluno) {
        return springRepo.save(aluno);
    }

    @Override
    public List<Aluno> findAllPremium() {
        return springRepo.findByTipoPlano(TipoPlano.PREMIUM);
    }
}
