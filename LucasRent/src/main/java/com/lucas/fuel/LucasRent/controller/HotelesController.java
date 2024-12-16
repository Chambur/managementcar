package com.lucas.fuel.LucasRent.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucas.fuel.LucasRent.model.Hoteles;
import com.lucas.fuel.LucasRent.service.HotelsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor


public class HotelesController {
    
    private final HotelsService hotelesService;

    @GetMapping //Obtener todos
    public ResponseEntity<List<Hoteles>> obtenerTodosLosCoches() {
        return ResponseEntity.ok(hotelesService.obtenerTodosLosHoteles());
    }

    @PostMapping
    public ResponseEntity<Hoteles> crearHotel(@RequestBody Hoteles hotel) {
        return ResponseEntity.ok(hotelesService.guardarHoteles(hotel));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hoteles> actualizarCoche(@PathVariable Long id, @RequestBody Hoteles hotel) {
        return ResponseEntity.ok(hotelesService.actualizarHoteles(id, hotel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCoche(@PathVariable Long id) {
        hotelesService.eliminarHoteles(id);
        return ResponseEntity.ok().build();
    }

}
