package com.lucas.fuel.LucasRent.repository;

import com.lucas.fuel.LucasRent.model.Coche;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CocheRepository extends JpaRepository<Coche, Long> {
    Optional<Coche> findById(Long id);
    boolean existsByMatricula(String matricula);
    
    interface MatriculaProjection {
        String getMatricula();
        String getModelo();
    }
    Optional<MatriculaProjection> findMatriculaById(Long id);
} 