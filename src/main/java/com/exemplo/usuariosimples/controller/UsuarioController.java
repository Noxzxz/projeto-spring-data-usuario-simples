package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.dto.UsuarioRequest;
import com.exemplo.usuariosimples.dto.UsuarioResponse;
import com.exemplo.usuariosimples.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// @RestController combina:
// - @Controller -> classe da camada web
// - @ResponseBody -> o retorno dos métodos vai direto para o corpo HTTP, geralmente em JSON
//
// Em outras palavras: esta classe expõe a API REST de usuários.
@RestController

// @RequestMapping("/usuarios") define o prefixo de rota para todos os endpoints da classe.
// Logo, os métodos internos responderão a rotas como:
// - POST   /usuarios
// - GET    /usuarios
// - GET    /usuarios/{id}
// - PUT    /usuarios/{id}
// - DELETE /usuarios/{id}
@RequestMapping("/usuarios")

// @Tag é usada pelo Swagger / OpenAPI para organizar e documentar os endpoints.
@Tag(name = "Usuários", description = "API didática para cadastro de usuários")
public class UsuarioController {

    // Dependência da camada controller para a camada service.
    // O controller NÃO cria o service com new.
    // Isso seria acoplamento manual.
    private final UsuarioService usuarioService;

    // ESTE É UM DOS PRINCIPAIS MOMENTOS DE INJEÇÃO DE DEPENDÊNCIA (DI).
    // O Spring vê que, para criar UsuarioController, ele precisa de um UsuarioService.
    // Como UsuarioService é um bean gerenciado pelo container, o Spring injeta aqui.
    //
    // RESUMO:
    // - IoC: o Spring decide criar o controller.
    // - DI : o Spring entrega o service pelo construtor.
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // @PostMapping mapeia requisições HTTP POST.
    // Como a rota base é /usuarios, este método responde a POST /usuarios.
    @PostMapping

    // Define explicitamente o status HTTP de sucesso como 201 Created.
    @ResponseStatus(HttpStatus.CREATED)

    // Anotação de documentação para o Swagger.
    @Operation(summary = "Cadastra um novo usuário")
    public UsuarioResponse criar(
            // @Valid ativa Bean Validation sobre o objeto recebido.
            // Se nome ou e-mail forem inválidos, o Spring lança MethodArgumentNotValidException.
            @Valid
            // @RequestBody pega o JSON do corpo da requisição e converte em UsuarioRequest.
            @RequestBody UsuarioRequest request) {

        // Controller enxuto: apenas recebe a requisição e delega a regra de negócio ao service.
        return usuarioService.criar(request);
    }

    // Responde a GET /usuarios.
    @GetMapping
    @Operation(summary = "Lista todos os usuários")
    public List<UsuarioResponse> listarTodos() {
        return usuarioService.listarTodos();
    }

    // Responde a GET /usuarios/{id}.
    @GetMapping("/{id}")
    @Operation(summary = "Busca um usuário pelo id")
    public UsuarioResponse buscarPorId(
            // @PathVariable pega o valor que veio na URL.
            // Exemplo: GET /usuarios/10 -> id = 10
            @PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    // Responde a PUT /usuarios/{id}.
    @PutMapping("/{id}")
    @Operation(summary = "Atualiza um usuário existente")
    public UsuarioResponse atualizar(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioRequest request) {
        return usuarioService.atualizar(id, request);
    }

    // Responde a DELETE /usuarios/{id}.
    @DeleteMapping("/{id}")

    // 204 No Content = exclusão com sucesso, sem corpo na resposta.
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Remove um usuário")
    public void remover(@PathVariable Long id) {
        usuarioService.remover(id);
    }
