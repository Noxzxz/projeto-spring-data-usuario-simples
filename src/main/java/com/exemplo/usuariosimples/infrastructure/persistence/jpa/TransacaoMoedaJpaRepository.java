package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.gamificacao.entity.TransacaoMoeda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

interface TransacaoMoedaJpaRepository extends JpaRepository<TransacaoMoeda, Long> {

    List<TransacaoMoeda> findByAlunoIdOrderByDataHoraDesc(UUID alunoId);
}
