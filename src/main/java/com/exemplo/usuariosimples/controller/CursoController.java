package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.dto.CursoRequestDTO;
import com.exemplo.usuariosimples.dto.CursoResponseDTO;
import com.exemplo.usuariosimples.dto.PagedResponseDTO;
import com.exemplo.usuariosimples.service.CursoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
@CrossOrigin(origins = "http://localhost:4200")
public class CursoController {

    private final CursoService service;

    public CursoController(CursoService service) {
        this.service = service;
    }

    @GetMapping
    public PagedResponseDTO<CursoResponseDTO> listar(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String busca) {

        List<CursoResponseDTO> todos = service.listar();

        List<CursoResponseDTO> filtrados = todos.stream()
                .filter(c -> status == null || status.equals(c.getStatus()))
                .filter(c -> busca == null || c.getTitulo().toLowerCase().contains(busca.toLowerCase()))
                .toList();

        return PagedResponseDTO.of(filtrados);
    }

    @GetMapping("/{id}")
    public CursoResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CursoResponseDTO criar(@Valid @RequestBody CursoRequestDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    public CursoResponseDTO atualizar(@PathVariable Long id, @Valid @RequestBody CursoRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}