package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.domain.academico.enums.StatusCurso;
import com.exemplo.usuariosimples.domain.academico.repository.CursoRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cursos")
@CrossOrigin
public class CursoController {

    private final CursoRepository repository;

    public CursoController(CursoRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Curso criar(@RequestBody Curso curso) {
        return repository.save(curso);
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        List<Curso> cursos = repository.findByStatus(StatusCurso.PUBLICADO);
        return ResponseEntity.ok(cursos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(curso -> ResponseEntity.ok(curso))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Curso nova) {
        return repository.findById(id)
                .map(c -> {
                    c.setTituloCurso(nova.getTituloCurso());
                    c.setDescCurso(nova.getDescCurso());
                    c.setStatus(nova.getStatus());
                    c.setModalidade(nova.getModalidade());
                    c.setNivel(nova.getNivel());
                    c.setPublicoAlvo(nova.getPublicoAlvo());
                    c.setConhecimentosPrevios(nova.getConhecimentosPrevios());
                    return ResponseEntity.ok(repository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
