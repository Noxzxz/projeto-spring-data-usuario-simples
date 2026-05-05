package com.exemplo.usuariosimples.domain;

import com.exemplo.usuariosimples.domain.vo.TituloCurso;
import com.exemplo.usuariosimples.domain.vo.DescricaoCurso;
import jakarta.persistence.*;

@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @AttributeOverride(name = "valor", column = @Column(name = "titulo"))
    private TituloCurso titulo;

    @Embedded
    @AttributeOverride(name = "valor", column = @Column(name = "descricao"))
    private DescricaoCurso descricao;

    @Column
    private String capUrl;

    @Column(nullable = false)
    private String categoria = "Geral";

    @Column(nullable = false)
    private String nivel = "INICIANTE";

    @Column(nullable = false)
    private String status = "PUBLICADO";

    @Column(nullable = false)
    private int totalAlunos = 0;

    @Column
    private Double avaliacao;

    @Column(nullable = false)
    private String duracaoTotal = "0h";

    @Column(nullable = false)
    private double preco = 0.0;

    @Column(nullable = false)
    private String tipoAcesso = "VITALICIO";

    @Column(nullable = false)
    private boolean certificacaoDigital = false;

    @ManyToOne
    @JoinColumn(name = "instrutor_id")
    private Usuario instrutor;

    protected Curso() {}

    public Curso(String titulo, String descricao) {
        this.titulo = new TituloCurso(titulo);
        this.descricao = new DescricaoCurso(descricao);
    }

    public Long getId() { return id; }
    public String getTitulo() { return titulo.getValor(); }
    public String getDescricao() { return descricao != null ? descricao.getValor() : null; }
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

    public void setTitulo(String titulo) { this.titulo = new TituloCurso(titulo); }
    public void setDescricao(String descricao) { this.descricao = new DescricaoCurso(descricao); }
    public void setCapUrl(String capUrl) { this.capUrl = capUrl; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public void setNivel(String nivel) { this.nivel = nivel; }
    public void setStatus(String status) { this.status = status; }
    public void setTotalAlunos(int totalAlunos) { this.totalAlunos = totalAlunos; }
    public void setAvaliacao(Double avaliacao) { this.avaliacao = avaliacao; }
    public void setDuracaoTotal(String duracaoTotal) { this.duracaoTotal = duracaoTotal; }
    public void setPreco(double preco) { this.preco = preco; }
    public void setTipoAcesso(String tipoAcesso) { this.tipoAcesso = tipoAcesso; }
    public void setCertificacaoDigital(boolean certificacaoDigital) { this.certificacaoDigital = certificacaoDigital; }

    public Usuario getInstrutor() { return instrutor; }
    public void setInstrutor(Usuario instrutor) { this.instrutor = instrutor; }
}