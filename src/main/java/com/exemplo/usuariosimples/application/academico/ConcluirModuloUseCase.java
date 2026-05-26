package com.exemplo.usuariosimples.application.academico;

import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import com.exemplo.usuariosimples.domain.academico.evento.CursoConcluidoEvent;
import com.exemplo.usuariosimples.domain.academico.repository.MatriculaRepository;
import com.exemplo.usuariosimples.domain.academico.service.ProgressaoModularService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ConcluirModuloUseCase {

    private final MatriculaRepository matriculaRepository;
    private final ProgressaoModularService progressaoService;
    private final ApplicationEventPublisher eventPublisher;

    public ConcluirModuloUseCase(MatriculaRepository matriculaRepository,
                                 ProgressaoModularService progressaoService,
                                 ApplicationEventPublisher eventPublisher) {
        this.matriculaRepository = matriculaRepository;
        this.progressaoService = progressaoService;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public ConcluirModuloResponse executar(Long matriculaId, int ordemModulo, Double nota) {
        Matricula matricula = matriculaRepository.findById(matriculaId)
                .orElseThrow(() -> new IllegalArgumentException("Matricula nao encontrada"));

        progressaoService.registrarConclusaoModulo(matricula, ordemModulo);
        matricula = matriculaRepository.save(matricula);

        boolean cursoConcluido = false;
        int modulosConcluidos = matricula.getModulosConcluidos();
        int totalModulos = matricula.getTotalModulos();

        if (modulosConcluidos >= totalModulos) {
            double notaFinal = nota != null ? nota : 0.0;
            matricula.concluir(notaFinal);
            matricula = matriculaRepository.save(matricula);
            cursoConcluido = true;

            eventPublisher.publishEvent(new CursoConcluidoEvent(
                    this, matriculaId, matricula.getAlunoId(),
                    matricula.getCursoId(), notaFinal));
        }

        int proximoModulo = modulosConcluidos < totalModulos ? modulosConcluidos + 1 : 0;

        return new ConcluirModuloResponse(
                modulosConcluidos,
                totalModulos,
                matricula.getPercentualConcluido(),
                proximoModulo,
                cursoConcluido
        );
    }

    public record ConcluirModuloResponse(
            int modulosConcluidos,
            int totalModulos,
            double percentualConcluido,
            int proximoModulo,
            boolean cursoConcluido
    ) {
    }
}
