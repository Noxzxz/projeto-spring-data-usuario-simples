package com.exemplo.usuariosimples.domain.academico.entity;

import com.exemplo.usuariosimples.domain.academico.enums.StatusMatricula;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "matriculas")
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID alunoId;

    @Column(nullable = false)
    private Long cursoId;

    @Column(nullable = false)
    private LocalDate dataMatricula;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusMatricula status;

    private LocalDate dataConclusao;

    private Double notaFinal;

    @Column(nullable = false)
    private int totalModulos;

    @Column(nullable = false)
    private int modulosConcluidos;

    public Matricula() {}

    public Matricula(UUID alunoId, Long cursoId, int totalModulos) {
        this.alunoId = alunoId;
        this.cursoId = cursoId;
        this.dataMatricula = LocalDate.now();
        this.status = StatusMatricula.EM_ANDAMENTO;
        this.totalModulos = totalModulos;
        this.modulosConcluidos = 0;
    }

    public boolean podeAvancarModulo() {
        return StatusMatricula.EM_ANDAMENTO.equals(this.status)
                && modulosConcluidos < totalModulos;
    }

    public void concluir(double notaFinal) {
        if (!StatusMatricula.EM_ANDAMENTO.equals(this.status)) {
            throw new IllegalStateException("Matricula nao esta em andamento");
        }
        this.notaFinal = notaFinal;
        this.status = StatusMatricula.CONCLUIDA;
        this.dataConclusao = LocalDate.now();
    }

    public void registrarModuloConcluido() {
        if (!podeAvancarModulo()) {
            throw new IllegalStateException("Nao e possivel avancar de modulo");
        }
        this.modulosConcluidos++;
    }

    public Long getId() { return id; }

    public UUID getAlunoId() { return alunoId; }

    public Long getCursoId() { return cursoId; }

    public LocalDate getDataMatricula() { return dataMatricula; }

    public StatusMatricula getStatus() { return status; }

    public LocalDate getDataConclusao() { return dataConclusao; }

    public Double getNotaFinal() { return notaFinal; }

    public int getTotalModulos() { return totalModulos; }

    public int getModulosConcluidos() { return modulosConcluidos; }

    public double getPercentualConcluido() {
        if (totalModulos == 0) return 100.0;
        return (double) modulosConcluidos / totalModulos * 100.0;
    }
}
