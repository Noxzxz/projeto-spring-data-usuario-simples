package com.exemplo.usuariosimples.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exemplo.usuariosimples.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
