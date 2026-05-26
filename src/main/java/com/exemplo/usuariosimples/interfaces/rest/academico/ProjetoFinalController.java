package com.exemplo.usuariosimples.interfaces.rest.academico;

import com.exemplo.usuariosimples.application.academico.AvaliarProjetoUseCase;
import com.exemplo.usuariosimples.application.academico.SubmeterProjetoUseCase;
import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import com.exemplo.usuariosimples.domain.academico.entity.ProjetoFinal;
import com.exemplo.usuariosimples.domain.academico.enums.StatusProjeto;
import com.exemplo.usuariosimples.domain.academico.repository.MatriculaRepository;
import com.exemplo.usuariosimples.domain.academico.repository.ProjetoFinalRepository;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.CursoJpaRepository;
import com.exemplo.usuariosimples.infrastructure.security.UserDetailsImpl;
import com.exemplo.usuariosimples.interfaces.rest.academico.dto.ProjetoFinalResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projetos")
@CrossOrigin
public class ProjetoFinalController {

    private final SubmeterProjetoUseCase submeterProjetoUseCase;
    private final AvaliarProjetoUseCase avaliarProjetoUseCase;
    private final ProjetoFinalRepository projetoFinalRepository;
    private final MatriculaRepository matriculaRepository;
    private final CursoJpaRepository cursoRepository;

    private static final String UPLOAD_DIR = "uploads/projetos/";

    public ProjetoFinalController(SubmeterProjetoUseCase submeterProjetoUseCase,
                                   AvaliarProjetoUseCase avaliarProjetoUseCase,
                                   ProjetoFinalRepository projetoFinalRepository,
                                   MatriculaRepository matriculaRepository,
                                   CursoJpaRepository cursoRepository) {
        this.submeterProjetoUseCase = submeterProjetoUseCase;
        this.avaliarProjetoUseCase = avaliarProjetoUseCase;
        this.projetoFinalRepository = projetoFinalRepository;
        this.matriculaRepository = matriculaRepository;
        this.cursoRepository = cursoRepository;
    }

    @PostMapping
    public ResponseEntity<?> submeter(Authentication authentication,
                                      @RequestParam("arquivo") MultipartFile arquivo,
                                      @RequestParam("matriculaId") Long matriculaId,
                                      @RequestParam("aulaId") Long aulaId,
                                      @RequestParam(value = "comentario", required = false) String comentario) {
        try {
            UUID alunoId = extractUserId(authentication);
            Matricula matricula = matriculaRepository.findById(matriculaId)
                    .orElseThrow(() -> new IllegalArgumentException("Matricula nao encontrada"));

            if (!matricula.getAlunoId().equals(alunoId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("erro", "Acesso negado"));
            }

            if (arquivo.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Arquivo obrigatorio"));
            }

            String contentType = arquivo.getContentType();
            if (contentType != null && !contentType.startsWith("application/") && !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Tipo de arquivo invalido. Aceitos: PDF, DOCX, ZIP"));
            }

            if (arquivo.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Arquivo muito grande. Maximo: 10MB"));
            }

            Path uploadPath = Paths.get(UPLOAD_DIR + matriculaId);
            Files.createDirectories(uploadPath);
            String nomeArquivo = System.currentTimeMillis() + "_" + arquivo.getOriginalFilename();
            Path filePath = uploadPath.resolve(nomeArquivo);
            arquivo.transferTo(filePath.toFile());

            ProjetoFinal projeto = submeterProjetoUseCase.executar(matriculaId, aulaId, nomeArquivo, comentario);
            return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(projeto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("erro", "Erro ao salvar arquivo"));
        }
    }

    @PatchMapping("/{id}/avaliar")
    public ResponseEntity<?> avaliar(Authentication authentication,
                                     @PathVariable Long id,
                                     @RequestBody Map<String, Object> body) {
        try {
            Double nota = body.get("nota") != null ? Double.valueOf(body.get("nota").toString()) : null;
            String feedback = (String) body.get("feedback");

            if (nota == null || nota < 0 || nota > 10) {
                return ResponseEntity.badRequest().body(Map.of("erro", "Nota deve estar entre 0 e 10"));
            }

            ProjetoFinal projeto = avaliarProjetoUseCase.executar(id, nota, feedback);
            return ResponseEntity.ok(toDTO(projeto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<?> listarPorCurso(Authentication authentication,
                                             @PathVariable Long cursoId,
                                             @RequestParam(required = false) String status) {
        try {
            Curso curso = cursoRepository.findById(cursoId)
                    .orElseThrow(() -> new IllegalArgumentException("Curso nao encontrado"));

            StatusProjeto filtroStatus = status != null ? StatusProjeto.valueOf(status) : null;
            List<ProjetoFinal> projetos = projetoFinalRepository.findByCursoIdAndStatus(cursoId, filtroStatus);

            List<ProjetoFinalResponseDTO> dtos = projetos.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dtos);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        return projetoFinalRepository.findById(id)
                .map(p -> ResponseEntity.ok(toDTO(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    private ProjetoFinalResponseDTO toDTO(ProjetoFinal p) {
        return new ProjetoFinalResponseDTO(
                p.getId(), p.getMatriculaId(), p.getAulaId(),
                p.getUrlArquivo(), p.getComentario(), p.getStatus(),
                p.getNota(), p.getFeedback(), p.getDataEnvio(), p.getDataAvaliacao());
    }

    private UUID extractUserId(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId();
    }
}
