package com.exemplo.usuariosimples.application.academico;

import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.domain.academico.entity.Matricula;
import com.exemplo.usuariosimples.domain.academico.enums.StatusCurso;
import com.exemplo.usuariosimples.domain.academico.repository.CursoRepository;
import com.exemplo.usuariosimples.domain.academico.repository.MatriculaRepository;
import com.exemplo.usuariosimples.domain.usuario.repository.AlunoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class MatricularAlunoUseCase {

    private final AlunoRepository alunoRepository;
    private final CursoRepository cursoRepository;
    private final MatriculaRepository matriculaRepository;

    public MatricularAlunoUseCase(AlunoRepository alunoRepository,
                                  CursoRepository cursoRepository,
                                  MatriculaRepository matriculaRepository) {
        this.alunoRepository = alunoRepository;
        this.cursoRepository = cursoRepository;
        this.matriculaRepository = matriculaRepository;
    }

    @Transactional
    public Matricula executar(UUID alunoId, Long cursoId) {
        var aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new IllegalArgumentException("Aluno nao encontrado"));

        var curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new IllegalArgumentException("Curso nao encontrado"));

        if (!StatusCurso.PUBLICADO.equals(curso.getStatus())) {
            throw new IllegalStateException("Curso nao esta disponivel para matricula");
        }

        if (matriculaRepository.findByAlunoIdAndCursoId(alunoId, cursoId).isPresent()) {
            throw new IllegalStateException("Aluno ja matriculado neste curso");
        }

        int totalModulos = curso.getModulos() != null ? curso.getModulos().size() : 0;

        Matricula matricula = new Matricula(alunoId, cursoId, totalModulos);
        return matriculaRepository.save(matricula);
    }
}
