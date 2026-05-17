package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.CursoJpaRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Curso")
@CrossOrigin
public class CursoController {

    private final CursoJpaRepository repository;

    public CursoController(CursoJpaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Curso criar(@RequestBody Curso Curso) {
        return repository.save(Curso);
    }

    @GetMapping
    public List<Curso> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Curso buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        repository.deleteById(id);
    }

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
