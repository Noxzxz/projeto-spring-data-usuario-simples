package com.exemplo.usuariosimples.infrastructure.persistence.jpa;

import com.exemplo.usuariosimples.domain.financeiro.entity.Assinatura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssinaturaJpaRepository extends JpaRepository<Assinatura, Long> {
}
