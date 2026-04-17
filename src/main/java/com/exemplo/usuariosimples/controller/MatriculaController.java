package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.domain.Matricula;
import com.exemplo.usuariosimples.repository.MatriculaRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/matriculas")
@CrossOrigin
public class MatriculaController {

    private final MatriculaRepository repository;

    public MatriculaController(MatriculaRepository repository) {
        this.repository = repository;
    }

    // POST → Criar matrícula
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Matricula criar(@RequestBody Matricula matricula) {
        return repository.save(matricula);
    }

    // GET → Listar todas
    @GetMapping
    public List<Matricula> listar() {
        return repository.findAll();
    }

    // GET → Buscar por ID
    @GetMapping("/{id}")
    public Matricula buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // DELETE → Remover
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // PUT → Atualizar
    @PutMapping("/{id}")
    public Matricula atualizar(@PathVariable Long id, @RequestBody Matricula nova) {
        return repository.findById(id)
                .map(m -> {
                    m.setAlunoId(nova.getAlunoId());
                    m.setCursoId(nova.getCursoId());
                    m.setDataMatricula(nova.getDataMatricula());
                    m.setStatus(nova.getStatus());
                    return repository.save(m);
                })
                .orElse(null);
    }
}