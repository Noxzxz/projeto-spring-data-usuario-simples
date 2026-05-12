package com.exemplo.usuariosimples.controller.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AtualizarUsuarioDTO(
        @NotBlank String nome,
        @NotBlank @Email String email
) {}
