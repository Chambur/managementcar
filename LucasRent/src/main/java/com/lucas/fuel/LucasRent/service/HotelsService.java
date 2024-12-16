package com.lucas.fuel.LucasRent.service;

import java.util.List;

import javax.management.RuntimeErrorException;

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

    public Hoteles actualizarHoteles(Long id, Hoteles hoteles) {
        Hoteles hotelesExistente = hotelsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Hotel no encontrado"));
            
        if (hotelsRepository.existsByName(hoteles.getName())){
            throw new RuntimeException("El nombre que quiere poner ya existe en otro registro");
        }else{
            hotelesExistente.setName(hoteles.getName());
            hotelesExistente.setAddres(hoteles.getAddres());
            return hotelsRepository.save(hotelesExistente);
        }
        
    }

    public void eliminarHoteles(Long id) {
        hotelsRepository.deleteById(id);
    }
}
