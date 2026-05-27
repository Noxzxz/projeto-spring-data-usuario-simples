package com.exemplo.usuariosimples.interfaces.rest.academico.dto;

import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.domain.academico.entity.Modulo;
import com.exemplo.usuariosimples.domain.academico.entity.Aula;

import java.util.List;

public record CursoResponseDTO(
        Long id,
        String titulo,
        String descricao,
        String publicoAlvo,
        String conhecimentosPrevios,
        String nivel,
        String status,
        List<ModuloResponseDTO> modulos
) {
    public static CursoResponseDTO from(Curso c) {
        return new CursoResponseDTO(
                c.getId(),
                c.getTituloCurso(),
                c.getDescCurso(),
                c.getPublicoAlvo(),
                c.getConhecimentosPrevios(),
                c.getNivel() != null ? c.getNivel().valor() : null,
                c.getStatus().name(),
                c.getModulos() != null
                        ? c.getModulos().stream().map(ModuloResponseDTO::from).toList()
                        : List.of()
        );
    }

    public record ModuloResponseDTO(
            Long id,
            String titulo,
            String descricao,
            int ordem,
            int totalAulas,
            List<AulaResponseDTO> aulas
    ) {
        public static ModuloResponseDTO from(Modulo m) {
            return new ModuloResponseDTO(
                    m.getId(),
                    m.getTitulo(),
                    m.getDescricao(),
                    m.getOrdem(),
                    m.getAulas() != null ? m.getAulas().size() : 0,
                    m.getAulas() != null
                            ? m.getAulas().stream().map(AulaResponseDTO::from).toList()
                            : List.of()
            );
        }
    }

    public record AulaResponseDTO(
            Long id,
            String titulo,
            String descricao,
            String tipo,
            String url,
            String duracao,
            int ordem
    ) {
        public static AulaResponseDTO from(Aula a) {
            String tipo = switch (a.getTipoConteudo().name()) {
                case "VIDEO" -> "VIDEO";
                case "PDF" -> "DOCUMENTO";
                case "LINK" -> "DOCUMENTO";
                case "AULA_SINCRONA_GRAVADA" -> "VIDEO";
                default -> "DOCUMENTO";
            };
            String duracao = a.getDuracaoMinutos() != null
                    ? a.getDuracaoMinutos() + " min"
                    : "";
            return new AulaResponseDTO(
                    a.getId(), a.getTitulo(), a.getDescricao(),
                    tipo, a.getUrl(), duracao, a.getOrdem()
            );
        }
    }
}
