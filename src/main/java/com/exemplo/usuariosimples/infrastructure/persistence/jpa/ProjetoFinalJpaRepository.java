package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.academico.entity.ProjetoFinal;
import com.exemplo.usuariosimples.domain.academico.enums.StatusProjeto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface ProjetoFinalJpaRepository extends JpaRepository<ProjetoFinal, Long> {

    List<ProjetoFinal> findByMatriculaId(Long matriculaId);

    List<ProjetoFinal> findByAulaId(Long aulaId);
}
