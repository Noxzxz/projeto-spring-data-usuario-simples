package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.dto.*;
import com.exemplo.usuariosimples.repository.MatriculaRepository;
import com.exemplo.usuariosimples.repository.UsuarioRepository;
import com.exemplo.usuariosimples.service.CursoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    private final CursoService cursoService;
    private final UsuarioRepository usuarioRepository;
    private final MatriculaRepository matriculaRepository;
    private final com.exemplo.usuariosimples.repository.CursoRepository cursoRepository;

    public DashboardController(CursoService cursoService,
                                UsuarioRepository usuarioRepository,
                                MatriculaRepository matriculaRepository,
                                com.exemplo.usuariosimples.repository.CursoRepository cursoRepository) {
        this.cursoService = cursoService;
        this.usuarioRepository = usuarioRepository;
        this.matriculaRepository = matriculaRepository;
        this.cursoRepository = cursoRepository;
    }

    @GetMapping("/aluno/dashboard")
    public ApiResponseDTO<DashboardAlunoDTO> dashboardAluno() {
        // Pega o total de participantes no "lounge" (todos os usuários ativos)
        long totalUsuarios = usuarioRepository.count();
        
        // Busca a primeira matrícula ativa encontrada no banco para simular o "usuário logado"
        List<com.exemplo.usuariosimples.domain.Matricula> matriculas = matriculaRepository.findAll();
        MatriculaAtivaDTO matriculaAtiva = null;

        if (!matriculas.isEmpty()) {
            com.exemplo.usuariosimples.domain.Matricula m = matriculas.get(0);
            com.exemplo.usuariosimples.domain.Curso curso = cursoRepository.findById(m.getCursoId()).orElse(null);
            
            if (curso != null) {
                CursoResponseDTO cursoDTO = new CursoResponseDTO(
                    curso.getId(), curso.getTitulo(), curso.getDescricao(), curso.getCapUrl(),
                    curso.getCategoria(), curso.getNivel(), curso.getStatus(), curso.getTotalAlunos(),
                    curso.getAvaliacao(), curso.getDuracaoTotal(), curso.getPreco(), curso.getTipoAcesso(),
                    curso.isCertificacaoDigital(), curso.getPublicoAlvo(), curso.getConhecimentosPrevios()
                );
                
                UsuarioSummaryDTO orientador = null;
                if (curso.getInstrutor() != null) {
                    orientador = new UsuarioSummaryDTO(
                        curso.getInstrutor().getId(), curso.getInstrutor().getNome(),
                        curso.getInstrutor().getEmail(), null, curso.getInstrutor().getPerfil()
                    );
                }

                matriculaAtiva = new MatriculaAtivaDTO(cursoDTO, orientador, "6 meses", 12, "Módulo 1");
            }
        }
        
        DashboardAlunoDTO dto = new DashboardAlunoDTO(matriculaAtiva, "CONCEDIDO", (int) totalUsuarios);
        return ApiResponseDTO.ok(dto);
    }

    @GetMapping("/instrutor/dashboard")
    public ApiResponseDTO<DashboardInstrutorDTO> dashboardInstrutor() {
        List<CursoResponseDTO> cursos = cursoService.listar();
        long totalAlunos = usuarioRepository.countByPerfil("ALUNO");
        
        DashboardInstrutorDTO dto = new DashboardInstrutorDTO(
                totalAlunos, 0, cursos.size(), 0, 1, cursos
        );
        return ApiResponseDTO.ok(dto);
    }
}
