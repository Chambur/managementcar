package com.lucas.fuel.LucasRent.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lucas.fuel.LucasRent.model.Hoteles;

public interface HotelsRepository extends JpaRepository<Hoteles, Long> {
    
    Optional<Hoteles> findByName(String name);
    boolean existsByName(String name);
    // Método para comprobar si existe un hotel con el mismo nombre pero diferente ID
    @Query("SELECT h FROM Hoteles h WHERE h.name = :name AND h.id != :id")
    Optional<Hoteles> findByNameAndDifferentId(@Param("name") String name, @Param("id") Long id);
} 


