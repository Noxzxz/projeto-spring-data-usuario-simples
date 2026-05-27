package com.exemplo.usuariosimples.application.academico;

import com.exemplo.usuariosimples.domain.academico.entity.ProjetoFinal;
import com.exemplo.usuariosimples.domain.academico.repository.ProjetoFinalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SubmeterProjetoUseCase {

    private final ProjetoFinalRepository projetoFinalRepository;

    public SubmeterProjetoUseCase(ProjetoFinalRepository projetoFinalRepository) {
        this.projetoFinalRepository = projetoFinalRepository;
    }

    @Transactional
    public ProjetoFinal executar(Long matriculaId, Long aulaId, String nomeArquivo, String comentario) {
        if (nomeArquivo == null || nomeArquivo.isBlank()) {
            throw new IllegalArgumentException("Arquivo obrigatorio");
        }

        String urlArquivo = "/uploads/projetos/" + matriculaId + "/" + nomeArquivo;
        ProjetoFinal projeto = new ProjetoFinal(matriculaId, aulaId, urlArquivo);
        projeto.setComentario(comentario);
        return projetoFinalRepository.save(projeto);
    }
}
