package com.lucas.fuel.LucasRent.repository;

import com.lucas.fuel.LucasRent.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
} 