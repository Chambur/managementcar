package com.lucas.fuel.LucasRent.repository;

import com.lucas.fuel.LucasRent.model.Coche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CocheRepository extends JpaRepository<Coche, Long> {
    Optional<Coche> findById(Long id);
    boolean existsByMatricula(String matricula);
    
    interface MatriculaProjection {
        String getMatricula();
        String getModelo();
    }
    Optional<MatriculaProjection> findMatriculaById(Long id);
    
    @Modifying
    @Query("UPDATE Coche c SET c.reservado = :reservado WHERE c.id = :id")
    int actualizarEstadoReservado(Long id, boolean reservado);
} 