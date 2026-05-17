package com.exemplo.usuariosimples.interfaces.rest.usuario;

import com.exemplo.usuariosimples.application.usuario.AuthUseCase;
import com.exemplo.usuariosimples.interfaces.rest.usuario.dto.AuthErrorDTO;
import com.exemplo.usuariosimples.interfaces.rest.usuario.dto.LoginRequestDTO;
import com.exemplo.usuariosimples.interfaces.rest.usuario.dto.LoginResponseDTO;
import com.exemplo.usuariosimples.interfaces.rest.usuario.dto.RegisterRequestDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthUseCase authUseCase;

    public AuthController(AuthUseCase authUseCase) {
        this.authUseCase = authUseCase;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequestDTO request) {
        if (!request.senha().equals(request.confirmarSenha())) {
            throw new IllegalArgumentException("Senhas não conferem");
        }
        authUseCase.register(request.nomeCompleto(), request.email(), request.senha());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = authUseCase.login(request.email(), request.senha());
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<AuthErrorDTO> handleIllegalArgument(IllegalArgumentException ex,
                                                               HttpServletRequest request) {
        AuthErrorDTO error = new AuthErrorDTO(
                HttpStatus.BAD_REQUEST.value(),
                "Erro de validação",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.badRequest().body(error);
    }
}
