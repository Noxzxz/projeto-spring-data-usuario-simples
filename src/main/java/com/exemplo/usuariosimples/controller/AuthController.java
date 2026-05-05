package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.domain.Usuario;
import com.exemplo.usuariosimples.dto.*;
import com.exemplo.usuariosimples.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto) {
        return usuarioRepository.findByEmail(dto.getEmail())
                .filter(u -> u.getSenha().equals(dto.getSenha()))
                .map(u -> ResponseEntity.ok(buildAuthResponse(u)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PostMapping("/registrar")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponseDTO registrar(@RequestBody RegisterRequestDTO dto) {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }
        Usuario novo = new Usuario();
        novo.setNome(dto.getNomeCompleto());
        novo.setEmail(dto.getEmail());
        novo.setSenha(dto.getSenha());
        novo.setAtivo(true);
        novo.setPerfil("ALUNO");
        Usuario salvo = usuarioRepository.save(novo);
        return buildAuthResponse(salvo);
    }

    private AuthResponseDTO buildAuthResponse(Usuario u) {
        UsuarioSummaryDTO summary = new UsuarioSummaryDTO(
                u.getId(), u.getNome(), u.getEmail(), null, u.getPerfil()
        );
        return new AuthResponseDTO("token-" + u.getId(), "Bearer", 3600, summary);
    }
}
