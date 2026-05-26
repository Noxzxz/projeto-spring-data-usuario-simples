package com.exemplo.usuariosimples.domain.academico.entity;

import com.exemplo.usuariosimples.domain.academico.enums.StatusProjeto;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "projeto_final")
public class ProjetoFinal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long matriculaId;

    @Column(nullable = false)
    private Long aulaId;

    @Column(nullable = false)
    private String urlArquivo;

    @Column(length = 500)
    private String comentario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusProjeto status;

    private Double nota;

    @Column(length = 1000)
    private String feedback;

    @Column(nullable = false)
    private LocalDateTime dataEnvio;

    private LocalDateTime dataAvaliacao;

    public ProjetoFinal() {}

    public ProjetoFinal(Long matriculaId, Long aulaId, String urlArquivo) {
        this.matriculaId = matriculaId;
        this.aulaId = aulaId;
        this.urlArquivo = urlArquivo;
        this.status = StatusProjeto.AGUARDANDO;
        this.dataEnvio = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Long getMatriculaId() { return matriculaId; }
    public Long getAulaId() { return aulaId; }
    public String getUrlArquivo() { return urlArquivo; }
    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
    public StatusProjeto getStatus() { return status; }
    public Double getNota() { return nota; }
    public String getFeedback() { return feedback; }
    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public LocalDateTime getDataAvaliacao() { return dataAvaliacao; }

    public void avaliar(double nota, String feedback) {
        if (nota < 0 || nota > 10) {
            throw new IllegalArgumentException("Nota deve estar entre 0 e 10");
        }
        this.nota = nota;
        this.feedback = feedback;
        this.status = nota >= 5 ? StatusProjeto.APROVADO : StatusProjeto.REVISAO;
        this.dataAvaliacao = LocalDateTime.now();
    }
}
