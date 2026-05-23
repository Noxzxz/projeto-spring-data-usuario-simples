package com.exemplo.usuariosimples.domain.academico.entity;

import com.exemplo.usuariosimples.domain.academico.enums.TipoConteudo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "aula")
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(length = 500)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TipoConteudo tipoConteudo;

    @Column(length = 500)
    private String url;

    @Column(name = "duracao_minutos")
    private Integer duracaoMinutos;

    @Column(nullable = false)
    private Integer ordem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modulo_id")
    @JsonIgnore
    private Modulo modulo;

    public Aula() {}

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }

    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }

    public void setDescricao(String descricao) { this.descricao = descricao; }

    public TipoConteudo getTipoConteudo() { return tipoConteudo; }

    public void setTipoConteudo(TipoConteudo tipoConteudo) { this.tipoConteudo = tipoConteudo; }

    public String getUrl() { return url; }

    public void setUrl(String url) { this.url = url; }

    public Integer getDuracaoMinutos() { return duracaoMinutos; }

    public void setDuracaoMinutos(Integer duracaoMinutos) { this.duracaoMinutos = duracaoMinutos; }

    public Integer getOrdem() { return ordem; }

    public void setOrdem(Integer ordem) { this.ordem = ordem; }

    public Modulo getModulo() { return modulo; }

    public void setModulo(Modulo modulo) { this.modulo = modulo; }
}
