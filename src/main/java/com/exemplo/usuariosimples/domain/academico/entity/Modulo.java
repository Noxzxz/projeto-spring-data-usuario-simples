package com.exemplo.usuariosimples.domain.academico.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "modulo")
public class Modulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(length = 500)
    private String descricao;

    @Column(nullable = false)
    private Integer ordem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curso_id")
    @JsonIgnore
    private Curso curso;

    @OneToMany(mappedBy = "modulo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("ordem ASC")
    private List<Aula> aulas = new ArrayList<>();

    public Modulo() {}

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }

    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }

    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Integer getOrdem() { return ordem; }

    public void setOrdem(Integer ordem) { this.ordem = ordem; }

    public Curso getCurso() { return curso; }

    public void setCurso(Curso curso) { this.curso = curso; }

    public List<Aula> getAulas() { return aulas; }

    public void setAulas(List<Aula> aulas) {
        this.aulas.clear();
        if (aulas != null) {
            aulas.forEach(this::addAula);
        }
    }

    public void addAula(Aula aula) {
        aulas.add(aula);
        aula.setModulo(this);
    }

    public void removeAula(Aula aula) {
        aulas.remove(aula);
        aula.setModulo(null);
    }
}
