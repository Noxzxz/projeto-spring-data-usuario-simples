package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.MatriculaJpaRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/matriculas")
@CrossOrigin
public class MatriculaController {

    private final MatriculaJpaRepository repository;

    public MatriculaController(MatriculaJpaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Matricula criar(@RequestBody Matricula matricula) {
        return repository.save(matricula);
    }

    @GetMapping
    public List<Matricula> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Matricula buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        repository.deleteById(id);
    }

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
