package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.application.academico.MatricularAlunoUseCase;
import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import com.exemplo.usuariosimples.domain.academico.repository.MatriculaRepository;
import com.exemplo.usuariosimples.infrastructure.security.UserDetailsImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/matriculas")
@CrossOrigin
public class MatriculaController {

    private final MatriculaRepository matriculaRepository;
    private final MatricularAlunoUseCase matricularAlunoUseCase;

    public MatriculaController(MatriculaRepository matriculaRepository,
                               MatricularAlunoUseCase matricularAlunoUseCase) {
        this.matriculaRepository = matriculaRepository;
        this.matricularAlunoUseCase = matricularAlunoUseCase;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Matricula matricular(Authentication authentication, @RequestBody MatriculaRequest request) {
        UUID alunoId = extractUserId(authentication);
        return matricularAlunoUseCase.executar(alunoId, request.cursoId());
    }

    @GetMapping
    public List<Matricula> listar() {
        return matriculaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Matricula> buscar(@PathVariable Long id) {
        return matriculaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/progresso")
    public ResponseEntity<MatriculaProgressoResponseDTO> progresso(@PathVariable Long id) {
        return matriculaRepository.findById(id)
                .map(m -> ResponseEntity.ok(new MatriculaProgressoResponseDTO(
                        m.getId(), m.getCursoId(), m.getStatus(),
                        m.getDataMatricula(), m.getDataConclusao(),
                        m.getNotaFinal(), m.getTotalModulos(),
                        m.getModulosConcluidos(), m.getPercentualConcluido())))
                .orElse(ResponseEntity.notFound().build());
    }

    private UUID extractUserId(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId();
    }
}

record MatriculaRequest(Long cursoId) {}
