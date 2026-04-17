package com.exemplo.usuariosimples.service;

import com.exemplo.usuariosimples.domain.Assinatura;
import com.exemplo.usuariosimples.repository.AssinaturaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AssinaturaService {

    private final AssinaturaRepository assinaturaRepository;

    // Injeção por construtor
    public AssinaturaService(AssinaturaRepository assinaturaRepository) {
        this.assinaturaRepository = assinaturaRepository;
    }

    /**
     * Retorna todas as assinaturas cadastradas.
     */
    public List<Assinatura> listarTodas() {
        return assinaturaRepository.findAll();
    }

    /**
     * Busca uma assinatura por ID.
     */
    public Optional<Assinatura> buscarPorId(Long id) {
        return assinaturaRepository.findById(id);
    }

    /**
     * Salva ou atualiza uma assinatura.
     */
    @Transactional
    public Assinatura salvar(Assinatura assinatura) {
        return assinaturaRepository.save(assinatura);
    }

    /**
     * Deleta uma assinatura pelo ID.
     */
    @Transactional
    public void deletar(Long id) {
        if (!assinaturaRepository.existsById(id)) {
            throw new RuntimeException("Assinatura não encontrada para o ID: " + id);
        }
        assinaturaRepository.deleteById(id);
    }
}