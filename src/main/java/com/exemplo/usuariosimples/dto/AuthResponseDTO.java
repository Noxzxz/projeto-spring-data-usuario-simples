package com.exemplo.usuariosimples.dto;

public class AuthResponseDTO {
    private String token;
    private String tokenType;
    private long expiresIn;
    private UsuarioSummaryDTO usuario;

    public AuthResponseDTO() {}

    public AuthResponseDTO(String token, String tokenType, long expiresIn, UsuarioSummaryDTO usuario) {
        this.token = token;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.usuario = usuario;
    }

    public String getToken() { return token; }
    public String getTokenType() { return tokenType; }
    public long getExpiresIn() { return expiresIn; }
    public UsuarioSummaryDTO getUsuario() { return usuario; }
}
