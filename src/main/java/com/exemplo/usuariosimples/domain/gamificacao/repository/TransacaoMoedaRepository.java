package com.exemplo.usuariosimples.domain.gamificacao.repository;

import com.exemplo.usuariosimples.domain.gamificacao.entity.TransacaoMoeda;

import java.util.List;
import java.util.UUID;

public interface TransacaoMoedaRepository {

    List<TransacaoMoeda> findByAlunoId(UUID alunoId);

    TransacaoMoeda save(TransacaoMoeda transacao);
}
