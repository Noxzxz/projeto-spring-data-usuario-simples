package com.exemplo.usuariosimples.interfaces.rest.usuario;

import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.repository.AlunoRepository;
import com.exemplo.usuariosimples.infrastructure.security.UserDetailsImpl;
import com.exemplo.usuariosimples.interfaces.rest.usuario.dto.AlunoResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/alunos")
@CrossOrigin
public class AlunoController {

    private final AlunoRepository alunoRepository;

    public AlunoController(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable UUID id) {
        return alunoRepository.findById(id)
                .map(aluno -> ResponseEntity.ok(AlunoResponseDTO.from(aluno)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/progresso")
    public ResponseEntity<?> progresso(Authentication authentication, @PathVariable UUID id) {
        UUID userId = extractUserId(authentication);
        if (!userId.equals(id)) {
            return ResponseEntity.status(403).body(Map.of("erro", "Acesso negado"));
        }

        return alunoRepository.findById(id)
                .map(aluno -> ResponseEntity.ok(AlunoResponseDTO.from(aluno)))
                .orElse(ResponseEntity.notFound().build());
    }

    private UUID extractUserId(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId();
    }
}
