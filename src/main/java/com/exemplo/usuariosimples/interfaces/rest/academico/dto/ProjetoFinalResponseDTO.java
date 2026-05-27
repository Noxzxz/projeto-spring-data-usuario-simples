package com.exemplo.usuariosimples.interfaces.rest.academico.dto;

import com.exemplo.usuariosimples.domain.academico.enums.StatusProjeto;

import java.time.LocalDateTime;

public record ProjetoFinalResponseDTO(
        Long id,
        Long matriculaId,
        Long aulaId,
        String urlArquivo,
        String comentario,
        StatusProjeto status,
        Double nota,
        String feedback,
        LocalDateTime dataEnvio,
        LocalDateTime dataAvaliacao
) {}
