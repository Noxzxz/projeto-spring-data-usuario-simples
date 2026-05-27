package com.exemplo.usuariosimples.domain.academico.repository;

import com.exemplo.usuariosimples.domain.academico.entity.ProjetoFinal;
import java.util.List;
import java.util.Optional;

public interface ProjetoFinalRepository {

    Optional<ProjetoFinal> findById(Long id);

    ProjetoFinal save(ProjetoFinal projetoFinal);

    List<ProjetoFinal> findByMatriculaId(Long matriculaId);

    List<ProjetoFinal> findByAulaId(Long aulaId);
}
