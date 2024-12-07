package com.lucas.fuel.LucasRent.service;

import com.lucas.fuel.LucasRent.model.Coche;
import com.lucas.fuel.LucasRent.repository.CocheRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CocheService {

    private final CocheRepository cocheRepository;

    public List<Coche> obtenerTodosLosCoches() {
        return cocheRepository.findAll();
    }

    public Coche guardarCoche(Coche coche) {
        if (cocheRepository.existsByMatricula(coche.getMatricula())) {
            throw new RuntimeException("Ya existe un coche con esa matrícula");
        }
        return cocheRepository.save(coche);
    }

    public Coche actualizarCoche(Long id, Coche coche) {
        Coche cocheExistente = cocheRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Coche no encontrado"));
        
        cocheExistente.setMatricula(coche.getMatricula());
        cocheExistente.setNivelGasolina(coche.getNivelGasolina());
        
        return cocheRepository.save(cocheExistente);
    }

    public void eliminarCoche(Long id) {
        cocheRepository.deleteById(id);
    }
} 