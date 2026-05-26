package com.exemplo.usuariosimples.interfaces.rest.usuario.dto;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;

public record AlunoResponseDTO(
        String id,
        String nome,
        String email,
        int totalCursosConcluidos,
        int saldoCursosExtras,
        int saldoMoedas,
        String tipoPlano,
        String visibilidadePerfil
) {
    public static AlunoResponseDTO from(Aluno aluno) {
        return new AlunoResponseDTO(
                aluno.getId().toString(),
                aluno.getNome().valor(),
                aluno.getEmail().endereco(),
                aluno.getTotalCursosConcluidos(),
                aluno.getSaldoCursosExtras(),
                aluno.getSaldoMoedas(),
                aluno.getTipoPlano().name(),
                aluno.getVisibilidadePerfil() != null ? aluno.getVisibilidadePerfil().name() : "PUBLICO"
        );
    }
}
