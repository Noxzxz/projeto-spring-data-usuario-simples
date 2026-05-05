package com.exemplo.usuariosimples.dto;

public class DashboardAlunoDTO {
    private MatriculaAtivaDTO matriculaAtiva;
    private String bibliotecaStatus;
    private int loungeParticipantes;

    public DashboardAlunoDTO() {}

    public DashboardAlunoDTO(MatriculaAtivaDTO matriculaAtiva, String bibliotecaStatus, int loungeParticipantes) {
        this.matriculaAtiva = matriculaAtiva;
        this.bibliotecaStatus = bibliotecaStatus;
        this.loungeParticipantes = loungeParticipantes;
    }

    public MatriculaAtivaDTO getMatriculaAtiva() { return matriculaAtiva; }
    public String getBibliotecaStatus() { return bibliotecaStatus; }
    public int getLoungeParticipantes() { return loungeParticipantes; }
}
