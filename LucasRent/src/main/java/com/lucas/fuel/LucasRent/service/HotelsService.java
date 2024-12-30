package com.lucas.fuel.LucasRent.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.lucas.fuel.LucasRent.model.Hoteles;
import com.lucas.fuel.LucasRent.repository.HotelsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class HotelsService {
    
    private final HotelsRepository hotelsRepository;

    public List<Hoteles> obtenerTodosLosHoteles() {
        return hotelsRepository.findAll();
    }

    public Hoteles guardarHoteles(Hoteles hotel) {
        if (hotelsRepository.existsByName(hotel.getName())) {
            throw new RuntimeException("Ya existe un hotel con esa nombre");
        }
        return hotelsRepository.save(hotel);
    }

    public Hoteles actualizarHoteles(Long id, Hoteles hotel) {
        // Verificar si existe el hotel
        Optional<Hoteles> hotelExistente = hotelsRepository.findById(id);
        if (!hotelExistente.isPresent()) {
            throw new RuntimeException("No existe el hotel con ID: " + id);
        }

        // Verificar si el nuevo nombre ya existe en otro hotel
        Optional<Hoteles> hotelConMismoNombre = hotelsRepository.findByNameAndDifferentId(hotel.getName(), id);
        if (hotelConMismoNombre.isPresent()) {
            throw new RuntimeException("Ya existe otro hotel con el nombre: " + hotel.getName());
        }

        // Actualizar los datos del hotel
        hotel.setId(id);
        return hotelsRepository.save(hotel);
    }

    public void eliminarHoteles(Long id) {
        hotelsRepository.deleteById(id);
    }
}
