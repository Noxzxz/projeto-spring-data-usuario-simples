package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.domain.academico.enums.StatusMatricula;

import java.time.LocalDate;

public record MatriculaProgressoResponseDTO(
        Long id,
        Long cursoId,
        StatusMatricula status,
        LocalDate dataMatricula,
        LocalDate dataConclusao,
        Double notaFinal,
        int totalModulos,
        int modulosConcluidos,
        double percentualConcluido
) {}
