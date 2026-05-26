package com.exemplo.usuariosimples.application.academico;

import com.exemplo.usuariosimples.domain.academico.entity.ProjetoFinal;
import com.exemplo.usuariosimples.domain.academico.repository.ProjetoFinalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AvaliarProjetoUseCase {

    private final ProjetoFinalRepository projetoFinalRepository;

    public AvaliarProjetoUseCase(ProjetoFinalRepository projetoFinalRepository) {
        this.projetoFinalRepository = projetoFinalRepository;
    }

    @Transactional
    public ProjetoFinal executar(Long projetoId, Double nota, String feedback) {
        if (nota == null) {
            throw new IllegalArgumentException("Nota obrigatoria");
        }

        ProjetoFinal projeto = projetoFinalRepository.findById(projetoId)
                .orElseThrow(() -> new IllegalArgumentException("Projeto nao encontrado"));

        projeto.avaliar(nota, feedback);
        return projetoFinalRepository.save(projeto);
    }
}
