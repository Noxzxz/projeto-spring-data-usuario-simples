package com.exemplo.usuariosimples.service;

import com.exemplo.usuariosimples.domain.Curso;
import com.exemplo.usuariosimples.dto.CursoRequestDTO;
import com.exemplo.usuariosimples.dto.CursoResponseDTO;
import com.exemplo.usuariosimples.repository.CursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService {

    private final CursoRepository repository;

    public CursoService(CursoRepository repository) {
        this.repository = repository;
    }

    // LISTAR
    public List<CursoResponseDTO> listar() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // BUSCAR POR ID
    public CursoResponseDTO buscarPorId(Long id) {
        Curso curso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
        return toDTO(curso);
    }

    // CRIAR
    public CursoResponseDTO criar(CursoRequestDTO dto) {
        Curso curso = new Curso(
                dto.getTituloCurso(),
                dto.getDescCurso()
        );

        return toDTO(repository.save(curso));
    }

    // ATUALIZAR
    public CursoResponseDTO atualizar(Long id, CursoRequestDTO dto) {
        Curso curso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        curso.setTitulo(dto.getTituloCurso());
        curso.setDescricao(dto.getDescCurso());

        return toDTO(repository.save(curso));
    }

    // DELETAR
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Curso não encontrado");
        }
        repository.deleteById(id);
    }

    // CONVERSÃO
    private CursoResponseDTO toDTO(Curso curso) {
        return new CursoResponseDTO(
                curso.getId(),
                curso.getTitulo(),
                curso.getDescricao()
        );
    }
}