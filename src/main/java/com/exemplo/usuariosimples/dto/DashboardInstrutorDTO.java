package com.exemplo.usuariosimples.dto;

import java.util.List;

public class DashboardInstrutorDTO {
    private long totalAlunos;
    private int variacaoAlunos;
    private long cursosAtivos;
    private int cursosEmProducao;
    private int alcancePaises;
    private List<CursoResponseDTO> cursos;

    public DashboardInstrutorDTO() {}

    public DashboardInstrutorDTO(long totalAlunos, int variacaoAlunos, long cursosAtivos,
                                  int cursosEmProducao, int alcancePaises, List<CursoResponseDTO> cursos) {
        this.totalAlunos = totalAlunos;
        this.variacaoAlunos = variacaoAlunos;
        this.cursosAtivos = cursosAtivos;
        this.cursosEmProducao = cursosEmProducao;
        this.alcancePaises = alcancePaises;
        this.cursos = cursos;
    }

    public long getTotalAlunos() { return totalAlunos; }
    public int getVariacaoAlunos() { return variacaoAlunos; }
    public long getCursosAtivos() { return cursosAtivos; }
    public int getCursosEmProducao() { return cursosEmProducao; }
    public int getAlcancePaises() { return alcancePaises; }
    public List<CursoResponseDTO> getCursos() { return cursos; }
}
