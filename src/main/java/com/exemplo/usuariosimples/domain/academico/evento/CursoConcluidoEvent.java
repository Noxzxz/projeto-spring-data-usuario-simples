package com.exemplo.usuariosimples.domain.academico.evento;

import org.springframework.context.ApplicationEvent;

import java.time.LocalDateTime;
import java.util.UUID;

public class CursoConcluidoEvent extends ApplicationEvent {

    private final Long matriculaId;
    private final UUID alunoId;
    private final Long cursoId;
    private final double notaFinal;
    private final LocalDateTime dataConclusao;

    public CursoConcluidoEvent(Object source, Long matriculaId, UUID alunoId,
                               Long cursoId, double notaFinal) {
        super(source);
        this.matriculaId = matriculaId;
        this.alunoId = alunoId;
        this.cursoId = cursoId;
        this.notaFinal = notaFinal;
        this.dataConclusao = LocalDateTime.now();
    }

    public Long getMatriculaId() {
        return matriculaId;
    }

    public UUID getAlunoId() {
        return alunoId;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public double getNotaFinal() {
        return notaFinal;
    }

    public LocalDateTime getDataConclusao() {
        return dataConclusao;
    }
}
