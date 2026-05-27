package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.domain.academico.entity.Aula;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.AulaJpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/aulas")
@CrossOrigin
public class AulaController {

    private final AulaJpaRepository aulaRepository;

    public AulaController(AulaJpaRepository aulaRepository) {
        this.aulaRepository = aulaRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        return aulaRepository.findById(id)
                .map(aula -> {
                    Long moduloId = aula.getModulo().getId();
                    Long cursoId = aula.getModulo().getCurso().getId();
                    return ResponseEntity.ok(new AulaResponseDTO(
                            aula.getId(), aula.getTitulo(), aula.getDescricao(),
                            aula.getTipoConteudo().name(), aula.getUrl(),
                            aula.getDuracaoMinutos(), aula.getOrdem(),
                            moduloId, cursoId
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    public record AulaResponseDTO(
            Long id, String titulo, String descricao,
            String tipoConteudo, String url,
            Integer duracaoMinutos, Integer ordem,
            Long moduloId, Long cursoId
    ) {}
}
