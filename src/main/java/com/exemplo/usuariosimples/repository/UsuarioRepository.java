package com.exemplo.usuariosimples.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.usuariosimples.domain.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    long countByPerfil(String perfil);
}
