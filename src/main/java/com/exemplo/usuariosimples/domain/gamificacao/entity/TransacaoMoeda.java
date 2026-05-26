package com.exemplo.usuariosimples.domain.gamificacao.entity;

import com.exemplo.usuariosimples.domain.gamificacao.enums.TipoConversaoMoeda;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transacao_moeda")
public class TransacaoMoeda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID alunoId;

    @Column(nullable = false)
    private int quantidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TipoConversaoMoeda tipo;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Column(length = 500)
    private String descricao;

    public TransacaoMoeda() {}

    public TransacaoMoeda(UUID alunoId, int quantidade, TipoConversaoMoeda tipo, String descricao) {
        this.alunoId = alunoId;
        this.quantidade = quantidade;
        this.tipo = tipo;
        this.descricao = descricao;
        this.dataHora = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public UUID getAlunoId() { return alunoId; }
    public int getQuantidade() { return quantidade; }
    public TipoConversaoMoeda getTipo() { return tipo; }
    public LocalDateTime getDataHora() { return dataHora; }
    public String getDescricao() { return descricao; }
}
