package com.exemplo.usuariosimples.dto;

public class CursoResponseDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String capUrl;
    private String categoria;
    private String nivel;
    private String status;
    private int totalAlunos;
    private Double avaliacao;
    private String duracaoTotal;
    private double preco;
    private String tipoAcesso;
    private boolean certificacaoDigital;
    private String publicoAlvo;
    private String conhecimentosPrevios;

    public CursoResponseDTO() {}

    public CursoResponseDTO(Long id, String titulo, String descricao, String capUrl,
                             String categoria, String nivel, String status, int totalAlunos,
                             Double avaliacao, String duracaoTotal, double preco,
                             String tipoAcesso, boolean certificacaoDigital, String publicoAlvo, String conhecimentosPrevios) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.capUrl = capUrl;
        this.categoria = categoria;
        this.nivel = nivel;
        this.status = status;
        this.totalAlunos = totalAlunos;
        this.avaliacao = avaliacao;
        this.duracaoTotal = duracaoTotal;
        this.preco = preco;
        this.tipoAcesso = tipoAcesso;
        this.certificacaoDigital = certificacaoDigital;
        this.publicoAlvo = publicoAlvo;
        this.conhecimentosPrevios = conhecimentosPrevios;
    }

    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescricao() { return descricao; }
    public String getCapUrl() { return capUrl; }
    public String getCategoria() { return categoria; }
    public String getNivel() { return nivel; }
    public String getStatus() { return status; }
    public int getTotalAlunos() { return totalAlunos; }
    public Double getAvaliacao() { return avaliacao; }
    public String getDuracaoTotal() { return duracaoTotal; }
    public double getPreco() { return preco; }
    public String getTipoAcesso() { return tipoAcesso; }
    public boolean isCertificacaoDigital() { return certificacaoDigital; }
    public String getPublicoAlvo() { return publicoAlvo; }
    public String getConhecimentosPrevios() { return conhecimentosPrevios; }
}