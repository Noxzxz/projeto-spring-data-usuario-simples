package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.application.academico.ConcluirModuloUseCase;
import com.exemplo.usuariosimples.application.academico.MatricularAlunoUseCase;
import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import com.exemplo.usuariosimples.domain.academico.repository.MatriculaRepository;
import com.exemplo.usuariosimples.infrastructure.security.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/matriculas")
@CrossOrigin
public class MatriculaController {

    private final MatriculaRepository matriculaRepository;
    private final MatricularAlunoUseCase matricularAlunoUseCase;
    private final ConcluirModuloUseCase concluirModuloUseCase;

    public MatriculaController(MatriculaRepository matriculaRepository,
                               MatricularAlunoUseCase matricularAlunoUseCase,
                               ConcluirModuloUseCase concluirModuloUseCase) {
        this.matriculaRepository = matriculaRepository;
        this.matricularAlunoUseCase = matricularAlunoUseCase;
        this.concluirModuloUseCase = concluirModuloUseCase;
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

    @PostMapping("/{id}/modulos/{ordem}/concluir")
    public ResponseEntity<?> concluirModulo(@PathVariable Long id,
                                             @PathVariable int ordem,
                                             @RequestBody(required = false) ConcluirModuloRequest body) {
        try {
            Double nota = body != null ? body.nota() : null;
            var response = concluirModuloUseCase.executar(id, ordem, nota);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    private UUID extractUserId(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId();
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleIllegalState(IllegalStateException ex,
                                                                   HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("erro", ex.getMessage(), "path", request.getRequestURI()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex,
                                                                      HttpServletRequest request) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("erro", ex.getMessage(), "path", request.getRequestURI()));
    }
}

record MatriculaRequest(Long cursoId) {}
record ConcluirModuloRequest(Double nota) {}
