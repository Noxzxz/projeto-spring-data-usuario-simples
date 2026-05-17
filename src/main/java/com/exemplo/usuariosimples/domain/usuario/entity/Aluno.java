package com.exemplo.usuariosimples.domain.usuario.entity;

import com.exemplo.usuariosimples.domain.usuario.enums.PerfilUsuario;
import com.exemplo.usuariosimples.domain.usuario.enums.TipoPlano;
import com.exemplo.usuariosimples.domain.usuario.enums.VisibilidadePerfil;
import com.exemplo.usuariosimples.domain.usuario.valueobject.CarteiraDigital;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.domain.usuario.valueobject.NomeCompleto;
import com.exemplo.usuariosimples.domain.usuario.valueobject.SenhaCriptografada;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "aluno")
@PrimaryKeyJoinColumn(name = "pessoa_id")
public class Aluno extends Pessoa {

    @Column(nullable = false)
    private int totalCursosConcluidos;

    @Column(nullable = false)
    private int saldoCursosExtras;

    @Column(nullable = false)
    private int saldoMoedas;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoPlano tipoPlano;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private VisibilidadePerfil visibilidadePerfil;

    @Embedded
    private CarteiraDigital carteiraDigital;

    protected Aluno() {
    }

    public Aluno(NomeCompleto nome, Email email, SenhaCriptografada senha,
                 boolean ativo, LocalDate dataNascimento) {
        super(nome, email, senha, ativo, dataNascimento, PerfilUsuario.ALUNO);
        this.totalCursosConcluidos = 0;
        this.saldoCursosExtras = 0;
        this.saldoMoedas = 0;
        this.tipoPlano = TipoPlano.BASICO;
        this.visibilidadePerfil = VisibilidadePerfil.PUBLICO;
        this.carteiraDigital = null;
    }

    public Aluno(NomeCompleto nome, Email email, SenhaCriptografada senha) {
        this(nome, email, senha, true, null);
    }

    public void receberCursosExtras(int quantidade) {
        this.saldoCursosExtras += quantidade;
    }

    public void fazerUpgradePremium() {
        this.tipoPlano = TipoPlano.PREMIUM;
    }

    public void creditarMoedas(int quantidade) {
        this.saldoMoedas += quantidade;
    }

    public boolean isPremium() {
        return TipoPlano.PREMIUM.equals(this.tipoPlano);
    }

    public void incrementarCursosConcluidos() {
        this.totalCursosConcluidos++;
    }

    public void alterarVisibilidadePerfil(VisibilidadePerfil visibilidade) {
        this.visibilidadePerfil = visibilidade;
    }

    public int getTotalCursosConcluidos() {
        return totalCursosConcluidos;
    }

    public void setTotalCursosConcluidos(int totalCursosConcluidos) {
        this.totalCursosConcluidos = totalCursosConcluidos;
    }

    public int getSaldoCursosExtras() {
        return saldoCursosExtras;
    }

    public void setSaldoCursosExtras(int saldoCursosExtras) {
        this.saldoCursosExtras = saldoCursosExtras;
    }

    public int getSaldoMoedas() {
        return saldoMoedas;
    }

    public void setSaldoMoedas(int saldoMoedas) {
        this.saldoMoedas = saldoMoedas;
    }

    public TipoPlano getTipoPlano() {
        return tipoPlano;
    }

    public void setTipoPlano(TipoPlano tipoPlano) {
        this.tipoPlano = tipoPlano;
    }

    public VisibilidadePerfil getVisibilidadePerfil() {
        return visibilidadePerfil;
    }

    public void setVisibilidadePerfil(VisibilidadePerfil visibilidadePerfil) {
        this.visibilidadePerfil = visibilidadePerfil;
    }

    public CarteiraDigital getCarteiraDigital() {
        return carteiraDigital;
    }

    public void setCarteiraDigital(CarteiraDigital carteiraDigital) {
        this.carteiraDigital = carteiraDigital;
    }
}
