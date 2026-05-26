package com.exemplo.usuariosimples.interfaces.rest.gamificacao.dto;

import com.exemplo.usuariosimples.domain.gamificacao.entity.TransacaoMoeda;

import java.time.LocalDateTime;

public record TransacaoMoedaDTO(
        Long id,
        int quantidade,
        String tipo,
        String descricao,
        LocalDateTime dataHora
) {
    public static TransacaoMoedaDTO from(TransacaoMoeda t) {
        return new TransacaoMoedaDTO(
                t.getId(), t.getQuantidade(),
                t.getTipo().name(), t.getDescricao(), t.getDataHora());
    }
}
