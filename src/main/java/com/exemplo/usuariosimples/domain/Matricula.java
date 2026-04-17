package com.exemplo.usuariosimples.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "matriculas")

public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long alunoId;

    private Long cursoId;

    private String dataMatricula;

    private String status;

    public Matricula() {}

    public Matricula(Long id, Long alunoId, Long cursoId, String dataMatricula, String status) {
        this.id = id;
        this.alunoId = alunoId;
        this.cursoId = cursoId;
        this.dataMatricula = dataMatricula;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getAlunoId() {
        return alunoId;
    }

    public void setAlunoId(Long alunoId) {
        this.alunoId = alunoId;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public String getDataMatricula() {
        return dataMatricula;
    }

    public void setDataMatricula(String dataMatricula) {
        this.dataMatricula = dataMatricula;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
