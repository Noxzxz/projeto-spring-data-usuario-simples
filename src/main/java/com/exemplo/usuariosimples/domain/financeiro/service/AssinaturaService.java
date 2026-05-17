package com.exemplo.usuariosimples.domain.financeiro.service;

import com.exemplo.usuariosimples.domain.financeiro.entity.Assinatura;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.AssinaturaJpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AssinaturaService {

    private final AssinaturaJpaRepository assinaturaRepository;

    public AssinaturaService(AssinaturaJpaRepository assinaturaRepository) {
        this.assinaturaRepository = assinaturaRepository;
    }

    public List<Assinatura> listarTodas() {
        return assinaturaRepository.findAll();
    }

    public Optional<Assinatura> buscarPorId(Long id) {
        return assinaturaRepository.findById(id);
    }

    @Transactional
    public Assinatura salvar(Assinatura assinatura) {
        return assinaturaRepository.save(assinatura);
    }

    @Transactional
    public void deletar(Long id) {
        if (!assinaturaRepository.existsById(id)) {
            throw new RuntimeException("Assinatura n\u00e3o encontrada para o ID: " + id);
        }
        assinaturaRepository.deleteById(id);
    }
}
