package com.exemplo.usuariosimples.interfaces.rest.gamificacao.dto;

import java.util.List;

public record SaldoMoedasResponseDTO(
        int saldo,
        List<TransacaoMoedaDTO> historico
) {}
