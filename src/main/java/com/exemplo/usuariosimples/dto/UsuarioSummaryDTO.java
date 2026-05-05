package com.exemplo.usuariosimples.dto;

public class UsuarioSummaryDTO {
    private Long id;
    private String nomeCompleto;
    private String email;
    private String avatarUrl;
    private String perfil;

    public UsuarioSummaryDTO() {}

    public UsuarioSummaryDTO(Long id, String nomeCompleto, String email, String avatarUrl, String perfil) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.perfil = perfil;
    }

    public Long getId() { return id; }
    public String getNomeCompleto() { return nomeCompleto; }
    public String getEmail() { return email; }
    public String getAvatarUrl() { return avatarUrl; }
    public String getPerfil() { return perfil; }
}
