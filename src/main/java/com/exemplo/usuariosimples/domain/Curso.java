package com.exemplo.usuariosimples.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 80)
    private String tituloCurso;

    @Column(nullable = false,length = 180)
    private String descCurso;

    public Curso() {
    }

    public Curso(Long id, String tituloCurso, String descCurso) {
        this.tituloCurso = tituloCurso;
        this.descCurso = descCurso;
    }

    public Long getId() {return  id;}

    public void setId(Long id) {this.id = id;}

    public String getTituloCurso() {return tituloCurso;}

    public void setTituloCurso(String tituloCurso) {this.tituloCurso = tituloCurso;}

    public String getDescCurso() {return descCurso;}

    public void setDescCurso(String descCurso) {this.descCurso = descCurso;}

}
