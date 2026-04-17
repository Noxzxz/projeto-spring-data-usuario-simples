package com.exemplo.usuariosimples.controller;

import com.exemplo.usuariosimples.domain.Assinatura;
import com.exemplo.usuariosimples.service.AssinaturaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assinaturas")
public class AssinaturaController {

    private final AssinaturaService assinaturaService;

    // Injeção do serviço via construtor
    public AssinaturaController(AssinaturaService assinaturaService) {
        this.assinaturaService = assinaturaService;
    }

    @GetMapping
    public List<Assinatura> listarTodas() {
        return assinaturaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assinatura> buscarPorId(@PathVariable Long id) {
        return assinaturaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Assinatura> criar(@RequestBody Assinatura assinatura) {
        Assinatura novaAssinatura = assinaturaService.salvar(assinatura);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaAssinatura);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assinatura> atualizar(@PathVariable Long id, @RequestBody Assinatura assinatura) {
        return assinaturaService.buscarPorId(id)
                .map(existente -> {
                    assinatura.setId(existente.getId());
                    return ResponseEntity.ok(assinaturaService.salvar(assinatura));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            assinaturaService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}