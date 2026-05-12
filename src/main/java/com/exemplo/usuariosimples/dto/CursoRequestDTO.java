package com.exemplo.usuariosimples.dto;

import jakarta.validation.constraints.NotBlank;

public class CursoRequestDTO {

    @NotBlank(message = "Titulo é obrigatório")
    private String titulo;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    private String categoria = "Geral";
    private String nivel = "INICIANTE";
    private String status = "PUBLICADO";
    private String tipoAcesso = "VITALICIO";
    private double preco = 0.0;
    private boolean certificacaoDigital = false;
    private String duracaoTotal = "0h";
    private String capUrl;
    private String publicoAlvo;
    private String conhecimentosPrevios;
    private Long instrutorId;

    public CursoRequestDTO() {}

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getTipoAcesso() { return tipoAcesso; }
    public void setTipoAcesso(String tipoAcesso) { this.tipoAcesso = tipoAcesso; }
    public double getPreco() { return preco; }
    public void setPreco(double preco) { this.preco = preco; }
    public boolean isCertificacaoDigital() { return certificacaoDigital; }
    public void setCertificacaoDigital(boolean certificacaoDigital) { this.certificacaoDigital = certificacaoDigital; }
    public String getDuracaoTotal() { return duracaoTotal; }
    public void setDuracaoTotal(String duracaoTotal) { this.duracaoTotal = duracaoTotal; }
    public String getCapUrl() { return capUrl; }
    public void setCapUrl(String capUrl) { this.capUrl = capUrl; }
    public String getPublicoAlvo() { return publicoAlvo; }
    public void setPublicoAlvo(String publicoAlvo) { this.publicoAlvo = publicoAlvo; }
    public String getConhecimentosPrevios() { return conhecimentosPrevios; }
    public void setConhecimentosPrevios(String conhecimentosPrevios) { this.conhecimentosPrevios = conhecimentosPrevios; }
    public Long getInstrutorId() { return instrutorId; }
    public void setInstrutorId(Long instrutorId) { this.instrutorId = instrutorId; }
}