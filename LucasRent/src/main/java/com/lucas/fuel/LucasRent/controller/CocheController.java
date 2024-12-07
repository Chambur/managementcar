package com.lucas.fuel.LucasRent.controller;

import com.lucas.fuel.LucasRent.model.Coche;
import com.lucas.fuel.LucasRent.service.CocheService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coches")
@RequiredArgsConstructor
public class CocheController {

    private final CocheService cocheService;

    @GetMapping
    public ResponseEntity<List<Coche>> obtenerTodosLosCoches() {
        return ResponseEntity.ok(cocheService.obtenerTodosLosCoches());
    }

    @PostMapping
    public ResponseEntity<Coche> crearCoche(@RequestBody Coche coche) {
        return ResponseEntity.ok(cocheService.guardarCoche(coche));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Coche> actualizarCoche(@PathVariable Long id, @RequestBody Coche coche) {
        return ResponseEntity.ok(cocheService.actualizarCoche(id, coche));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCoche(@PathVariable Long id) {
        cocheService.eliminarCoche(id);
        return ResponseEntity.ok().build();
    }
}