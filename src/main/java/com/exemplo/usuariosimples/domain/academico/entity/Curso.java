package com.exemplo.usuariosimples.domain.academico.entity;

import com.exemplo.usuariosimples.domain.academico.enums.ModalidadeCurso;
import com.exemplo.usuariosimples.domain.academico.enums.StatusCurso;
import com.exemplo.usuariosimples.domain.academico.valueobject.NivelCurso;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String tituloCurso;

    @Column(nullable = false, length = 180)
    private String descCurso;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusCurso status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ModalidadeCurso modalidade;

    @Embedded
    private NivelCurso nivel;

    @Column(length = 500)
    private String publicoAlvo;

    @Column(length = 500)
    private String conhecimentosPrevios;

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("ordem ASC")
    private List<Modulo> modulos = new ArrayList<>();

    public Curso() {}

    public Curso(Long id, String tituloCurso, String descCurso) {
        this.id = id;
        this.tituloCurso = tituloCurso;
        this.descCurso = descCurso;
    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTituloCurso() { return tituloCurso; }

    public void setTituloCurso(String tituloCurso) { this.tituloCurso = tituloCurso; }

    public String getDescCurso() { return descCurso; }

    public void setDescCurso(String descCurso) { this.descCurso = descCurso; }

    public StatusCurso getStatus() { return status; }

    public void setStatus(StatusCurso status) { this.status = status; }

    public ModalidadeCurso getModalidade() { return modalidade; }

    public void setModalidade(ModalidadeCurso modalidade) { this.modalidade = modalidade; }

    public NivelCurso getNivel() { return nivel; }

    public void setNivel(NivelCurso nivel) { this.nivel = nivel; }

    public String getPublicoAlvo() { return publicoAlvo; }

    public void setPublicoAlvo(String publicoAlvo) { this.publicoAlvo = publicoAlvo; }

    public String getConhecimentosPrevios() { return conhecimentosPrevios; }

    public void setConhecimentosPrevios(String conhecimentosPrevios) { this.conhecimentosPrevios = conhecimentosPrevios; }

    public List<Modulo> getModulos() { return modulos; }

    public void setModulos(List<Modulo> modulos) {
        this.modulos.clear();
        if (modulos != null) {
            modulos.forEach(this::addModulo);
        }
    }

    public void addModulo(Modulo modulo) {
        modulos.add(modulo);
        modulo.setCurso(this);
    }

    public void removeModulo(Modulo modulo) {
        modulos.remove(modulo);
        modulo.setCurso(null);
    }
}
