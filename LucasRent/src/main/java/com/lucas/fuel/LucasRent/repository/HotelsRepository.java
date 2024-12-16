package com.lucas.fuel.LucasRent.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucas.fuel.LucasRent.model.Coche;
import com.lucas.fuel.LucasRent.model.Hoteles;


    public interface HotelsRepository extends JpaRepository<Hoteles, Long> {
        Optional<Coche> findByName(String name);
        boolean existsByName(String name);
    } 

