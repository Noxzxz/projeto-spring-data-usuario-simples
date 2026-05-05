package com.exemplo.usuariosimples.service;

import com.exemplo.usuariosimples.domain.Curso;
import com.exemplo.usuariosimples.dto.CursoRequestDTO;
import com.exemplo.usuariosimples.dto.CursoResponseDTO;
import com.exemplo.usuariosimples.repository.CursoRepository;
import com.exemplo.usuariosimples.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService {

    private final CursoRepository repository;
    private final UsuarioRepository usuarioRepository;

    public CursoService(CursoRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<CursoResponseDTO> listar() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }

    public CursoResponseDTO buscarPorId(Long id) {
        Curso curso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
        return toDTO(curso);
    }

    public CursoResponseDTO criar(CursoRequestDTO dto) {
        Curso curso = new Curso(dto.getTitulo(), dto.getDescricao());
        aplicarCampos(curso, dto);
        return toDTO(repository.save(curso));
    }

    public CursoResponseDTO atualizar(Long id, CursoRequestDTO dto) {
        Curso curso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
        curso.setTitulo(dto.getTitulo());
        curso.setDescricao(dto.getDescricao());
        aplicarCampos(curso, dto);
        return toDTO(repository.save(curso));
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) throw new RuntimeException("Curso não encontrado");
        repository.deleteById(id);
    }

    private void aplicarCampos(Curso curso, CursoRequestDTO dto) {
        if (dto.getCategoria() != null) curso.setCategoria(dto.getCategoria());
        if (dto.getNivel() != null) curso.setNivel(dto.getNivel());
        if (dto.getStatus() != null) curso.setStatus(dto.getStatus());
        if (dto.getTipoAcesso() != null) curso.setTipoAcesso(dto.getTipoAcesso());
        if (dto.getDuracaoTotal() != null) curso.setDuracaoTotal(dto.getDuracaoTotal());
        if (dto.getCapUrl() != null) curso.setCapUrl(dto.getCapUrl());
        if (dto.getInstrutorId() != null) {
            usuarioRepository.findById(dto.getInstrutorId()).ifPresent(curso::setInstrutor);
        }
        curso.setPreco(dto.getPreco());
        curso.setCertificacaoDigital(dto.isCertificacaoDigital());
    }

    private CursoResponseDTO toDTO(Curso curso) {
        return new CursoResponseDTO(
                curso.getId(),
                curso.getTitulo(),
                curso.getDescricao(),
                curso.getCapUrl(),
                curso.getCategoria(),
                curso.getNivel(),
                curso.getStatus(),
                curso.getTotalAlunos(),
                curso.getAvaliacao(),
                curso.getDuracaoTotal(),
                curso.getPreco(),
                curso.getTipoAcesso(),
                curso.isCertificacaoDigital()
        );
    }
}