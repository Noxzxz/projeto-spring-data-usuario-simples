package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.gamificacao.entity.TransacaoMoeda;
import com.exemplo.usuariosimples.domain.gamificacao.repository.TransacaoMoedaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class TransacaoMoedaRepositoryJpa implements TransacaoMoedaRepository {

    private final TransacaoMoedaJpaRepository springRepo;

    public TransacaoMoedaRepositoryJpa(TransacaoMoedaJpaRepository springRepo) {
        this.springRepo = springRepo;
    }

    @Override
    public List<TransacaoMoeda> findByAlunoId(UUID alunoId) {
        return springRepo.findByAlunoIdOrderByDataHoraDesc(alunoId);
    }

    @Override
    public TransacaoMoeda save(TransacaoMoeda transacao) {
        return springRepo.save(transacao);
    }
}
