package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.domain.Curso;
import com.exemplo.usuariosimples.domain.Matricula;
import com.exemplo.usuariosimples.repository.CursoRepository;
import com.exemplo.usuariosimples.repository.MatriculaRepository;
import com.exemplo.usuariosimples.service.CursoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController

@RequestMapping("Curso")

@CrossOrigin

//@tag(name = "Curso", description = "Api didadita para cadastro de curso")
public class CursoController {

    private final CursoRepository repository;

    public CursoController(CursoRepository repository) {
        this.repository = repository;
    }

    // POST → Criar curso
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Curso criar(@RequestBody Curso Curso) {
        return repository.save(Curso);
    }

    // GET → Listar todas
    @GetMapping
    public List<Curso> listar() {
        return repository.findAll();
    }

    // GET → Buscar por ID
    @GetMapping("/{id}")
    public Curso buscar(@PathVariable Long id) {
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
    public Curso atualizar(@PathVariable Long id, @RequestBody Curso nova) {
        return repository.findById(id)
                .map(c -> {
                    c.setId(nova.getId());
                    c.setTituloCurso(nova.getTituloCurso());
                    c.setDescCurso(nova.getDescCurso());
                    return repository.save(c);
                })
                .orElse(null);
    }




}

