package com.exemplo.usuariosimples.service;

import com.exemplo.usuariosimples.domain.Usuario;
import com.exemplo.usuariosimples.domain.vo.EmailUsuario;
import com.exemplo.usuariosimples.domain.vo.NomeUsuario;
import com.exemplo.usuariosimples.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario criar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado para o id: "+ id));
    }

    @Transactional
    public void atualizar(Long id, String novoNomeStr, String novoEmailStr) {
        // 1. Busca o usuário existente no banco
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));

        // 2. Cria novos Value Objects (aqui as validações de domínio rodam)
        NomeUsuario novoNome = new NomeUsuario(novoNomeStr);
        EmailUsuario novoEmail = new EmailUsuario(novoEmailStr);

        // 3. Aplica a alteração via método de negócio da entidade
        usuario.alterarPerfil(novoNome, novoEmail);

        // No final do método, o Hibernate detecta a alteração na entidade "usuario"
        // e faz o UPDATE automaticamente devido ao @Transactional.
        usuarioRepository.save(usuario);
    }

    public void deletar(long id) {
        Usuario usuarioExistente = buscarPorId(id);
        usuarioRepository.delete(usuarioExistente);
    }
}

