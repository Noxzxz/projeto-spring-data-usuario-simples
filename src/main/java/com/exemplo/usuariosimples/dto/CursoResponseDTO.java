package com.exemplo.usuariosimples.dto;

public class CursoResponseDTO {

    private Long id;
    private String tituloCurso;
    private String descCurso;

    public CursoResponseDTO(Long id, String tituloCurso, String descCurso) {
        this.id = id;
        this.tituloCurso = tituloCurso;
        this.descCurso = descCurso;
    }

    public Long getId() { return id; }
    public String getTituloCurso() { return tituloCurso; }
    public String getDescCurso() { return descCurso; }
}