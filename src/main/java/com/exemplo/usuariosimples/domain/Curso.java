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

    protected Curso() {}

    public Curso(String titulo, String descricao) {
        this.titulo = new TituloCurso(titulo);
        this.descricao = new DescricaoCurso(descricao);
    }

    public Long getId() { return id; }

    public String getTitulo() { return titulo.getValor(); }

    public String getDescricao() {
        return descricao != null ? descricao.getValor() : null;
    }

    public void setTitulo(String titulo) {
        this.titulo = new TituloCurso(titulo);
    }

    public void setDescricao(String descricao) {
        this.descricao = new DescricaoCurso(descricao);
    }
}