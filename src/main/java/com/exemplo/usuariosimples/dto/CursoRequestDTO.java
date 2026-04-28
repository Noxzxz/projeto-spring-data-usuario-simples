package com.exemplo.usuariosimples.dto;

import jakarta.validation.constraints.NotBlank;

public class CursoRequestDTO {

    @NotBlank(message = "Titulo é obrigatório")
    private String tituloCurso;

    @NotBlank(message = "Descrição é obrigatória")
    private String descCurso;

    public CursoRequestDTO() {}

    public String getTituloCurso() { return tituloCurso; }
    public void setTituloCurso(String tituloCurso) { this.tituloCurso = tituloCurso; }

    public String getDescCurso() { return descCurso; }
    public void setDescCurso(String descCurso) { this.descCurso = descCurso; }
}