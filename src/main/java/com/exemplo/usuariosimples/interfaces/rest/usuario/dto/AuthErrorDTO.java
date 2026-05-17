package com.exemplo.usuariosimples.interfaces.rest.usuario.dto;

public record AuthErrorDTO(
        int status,
        String erro,
        String mensagem,
        String path
) {
}
