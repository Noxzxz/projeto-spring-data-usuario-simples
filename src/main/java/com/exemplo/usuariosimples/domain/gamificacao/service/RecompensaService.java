package com.exemplo.usuariosimples.domain.gamificacao.service;

import com.exemplo.usuariosimples.domain.academico.evento.CursoConcluidoEvent;
import com.exemplo.usuariosimples.domain.gamificacao.entity.TransacaoMoeda;
import com.exemplo.usuariosimples.domain.gamificacao.enums.TipoConversaoMoeda;
import com.exemplo.usuariosimples.domain.gamificacao.repository.TransacaoMoedaRepository;
import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.repository.AlunoRepository;
import com.exemplo.usuariosimples.domain.usuario.service.UpgradePlanoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class RecompensaService {

    private static final Logger log = LoggerFactory.getLogger(RecompensaService.class);

    private final AlunoRepository alunoRepository;
    private final TransacaoMoedaRepository transacaoMoedaRepository;
    private final UpgradePlanoService upgradePlanoService;

    private final Set<Long> eventosProcessados = new HashSet<>();

    public RecompensaService(AlunoRepository alunoRepository,
                             TransacaoMoedaRepository transacaoMoedaRepository,
                             UpgradePlanoService upgradePlanoService) {
        this.alunoRepository = alunoRepository;
        this.transacaoMoedaRepository = transacaoMoedaRepository;
        this.upgradePlanoService = upgradePlanoService;
    }

    @EventListener
    @Transactional
    public void processarFimDeCurso(CursoConcluidoEvent event) {
        if (eventosProcessados.contains(event.getMatriculaId())) {
            log.info("Evento ja processado para matricula {}", event.getMatriculaId());
            return;
        }

        log.info("Processando recompensas para matricula {} - nota: {}",
                event.getMatriculaId(), event.getNotaFinal());

        Aluno aluno = alunoRepository.findById(event.getAlunoId())
                .orElseThrow(() -> new IllegalArgumentException("Aluno nao encontrado"));

        boolean aprovado = event.getNotaFinal() >= 7.0;

        if (aprovado) {
            aluno.receberCursosExtras(3);
            log.info("Aluno {} recebeu +3 cursos extras (nota {} >= 7.0)",
                    aluno.getId(), event.getNotaFinal());
        }

        aluno.incrementarCursosConcluidos();

        if (aluno.isPremium()) {
            aluno.creditarMoedas(3);
            transacaoMoedaRepository.save(new TransacaoMoeda(
                    aluno.getId(), 3, TipoConversaoMoeda.ACUMULO_SALDO,
                    "Bonus por conclusao de curso (Premium)"));
            log.info("Aluno {} Premium recebeu +3 moedas", aluno.getId());
        }

        alunoRepository.save(aluno);

        upgradePlanoService.verificarEAplicarUpgrade(aluno);
        alunoRepository.save(aluno);
        if (aluno.isPremium()) {
            log.info("Aluno {} fez upgrade para PREMIUM!", aluno.getId());
        }

        eventosProcessados.add(event.getMatriculaId());
    }
}
