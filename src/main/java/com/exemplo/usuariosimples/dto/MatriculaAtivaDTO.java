package com.exemplo.usuariosimples.dto;

public class MatriculaAtivaDTO {
    private CursoResponseDTO curso;
    private UsuarioSummaryDTO orientador;
    private String duracao;
    private int creditos;
    private String primeiroModulo;

    public MatriculaAtivaDTO() {}

    public MatriculaAtivaDTO(CursoResponseDTO curso, UsuarioSummaryDTO orientador, String duracao, int creditos, String primeiroModulo) {
        this.curso = curso;
        this.orientador = orientador;
        this.duracao = duracao;
        this.creditos = creditos;
        this.primeiroModulo = primeiroModulo;
    }

    public CursoResponseDTO getCurso() { return curso; }
    public void setCurso(CursoResponseDTO curso) { this.curso = curso; }

    public UsuarioSummaryDTO getOrientador() { return orientador; }
    public void setOrientador(UsuarioSummaryDTO orientador) { this.orientador = orientador; }

    public String getDuracao() { return duracao; }
    public void setDuracao(String duracao) { this.duracao = duracao; }

    public int getCreditos() { return creditos; }
    public void setCreditos(int creditos) { this.creditos = creditos; }

    public String getPrimeiroModulo() { return primeiroModulo; }
    public void setPrimeiroModulo(String primeiroModulo) { this.primeiroModulo = primeiroModulo; }
}
