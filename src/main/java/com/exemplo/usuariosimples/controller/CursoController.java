package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.dto.CursoRequestDTO;
import com.exemplo.usuariosimples.dto.CursoResponseDTO;
import com.exemplo.usuariosimples.service.CursoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    private final CursoService service;

    public CursoController(CursoService service) {
        this.service = service;
    }

    // LISTAR
    @GetMapping
    public List<CursoResponseDTO> listar() {
        return service.listar();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public CursoResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // CRIAR
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CursoResponseDTO criar(@Valid @RequestBody CursoRequestDTO dto) {
        return service.criar(dto);
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public CursoResponseDTO atualizar(
            @PathVariable Long id,
            @Valid @RequestBody CursoRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    // DELETAR
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}