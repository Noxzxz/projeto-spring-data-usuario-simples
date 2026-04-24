package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.controller.dto.AtualizarUsuarioDTO;
import com.exemplo.usuariosimples.domain.Usuario;
import com.exemplo.usuariosimples.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController combina:
// - @Controller -> classe da camada web
// - @ResponseBody -> o retorno vai direto para o corpo HTTP (JSON)
@RestController

// Prefixo da rota
@RequestMapping("/usuarios")

// Swagger
@Tag(name = "Usuários", description = "API didática para cadastro de usuários")
public class UsuarioController {

    // Dependência do service (injeção de dependência)
    private final UsuarioService usuarioService;

    // Construtor com DI (igual ao padrão da professora)
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // POST /usuarios
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Cadastra um novo usuário")
    public Usuario criar(
            @Valid
            @RequestBody Usuario usuario) {

        return usuarioService.criar(usuario);
    }

    // GET /usuarios
    @GetMapping
    @Operation(summary = "Lista todos os usuários")
    public List<Usuario> listarTodos() {
        return usuarioService.listar();
    }

    // GET /usuarios/{id}
    @GetMapping("/{id}")
    @Operation(summary = "Busca um usuário pelo id")
    public Usuario buscarPorId(
            @PathVariable Long id) {

        return usuarioService.buscarPorId(id);
    }

    // PUT /usuarios/{id}
    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um usuário existente")
    public ResponseEntity<Void> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody AtualizarUsuarioDTO dto) {

        usuarioService.atualizar(id, dto.nome(), dto.email());
        return ResponseEntity.noContent().build(); // 204 No Content é o ideal para updates que não retornam corpo
    }

    // DELETE /usuarios/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Remove um usuário")
    public void remover(@PathVariable Long id) {
        usuarioService.deletar(id);
    }
}