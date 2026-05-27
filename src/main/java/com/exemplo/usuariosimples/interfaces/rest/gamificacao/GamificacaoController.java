package com.exemplo.usuariosimples.interfaces.rest.gamificacao;

import com.exemplo.usuariosimples.domain.gamificacao.entity.TransacaoMoeda;
import com.exemplo.usuariosimples.domain.gamificacao.repository.TransacaoMoedaRepository;
import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.repository.AlunoRepository;
import com.exemplo.usuariosimples.infrastructure.security.UserDetailsImpl;
import com.exemplo.usuariosimples.interfaces.rest.gamificacao.dto.SaldoMoedasResponseDTO;
import com.exemplo.usuariosimples.interfaces.rest.gamificacao.dto.TransacaoMoedaDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/gamificacao")
@CrossOrigin
public class GamificacaoController {

    private final AlunoRepository alunoRepository;
    private final TransacaoMoedaRepository transacaoMoedaRepository;

    public GamificacaoController(AlunoRepository alunoRepository,
                                  TransacaoMoedaRepository transacaoMoedaRepository) {
        this.alunoRepository = alunoRepository;
        this.transacaoMoedaRepository = transacaoMoedaRepository;
    }

    @GetMapping("/moedas")
    public ResponseEntity<?> moedas(Authentication authentication) {
        UUID alunoId = extractUserId(authentication);
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new IllegalArgumentException("Aluno nao encontrado"));

        List<TransacaoMoeda> transacoes = transacaoMoedaRepository.findByAlunoId(alunoId);
        List<TransacaoMoedaDTO> historico = transacoes.stream()
                .map(TransacaoMoedaDTO::from)
                .toList();

        return ResponseEntity.ok(new SaldoMoedasResponseDTO(aluno.getSaldoMoedas(), historico));
    }

    private UUID extractUserId(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId();
    }
}
