package com.exemplo.usuariosimples.interfaces.rest.usuario.dto;

public record LoginResponseDTO(
        String token,
        String tokenType,
        long expiresIn,
        UsuarioInfo usuario
) {
    public record UsuarioInfo(
            String id,
            String nomeCompleto,
            String email,
            String perfil
    ) {}
}
