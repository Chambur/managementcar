package com.lucas.fuel.LucasRent.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lucas.fuel.LucasRent.model.Hoteles;
import com.lucas.fuel.LucasRent.service.HotelsService;
import com.lucas.fuel.LucasRent.model.ErrorResponse;
import com.lucas.fuel.LucasRent.repository.HotelsRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
public class HotelesController {
    
    private final HotelsService hotelesService;
    private final HotelsRepository hotelesRepository;

    @GetMapping
    public ResponseEntity<List<Hoteles>> getAllHotels() {
        return ResponseEntity.ok(hotelesService.obtenerTodosLosHoteles());
    }

    @PostMapping
    public ResponseEntity<?> createHotel(@RequestBody Hoteles hotel) {
        try {
            // Verificar si ya existe un hotel con el mismo nombre
            Optional<Hoteles> existingHotel = hotelesRepository.findByName(hotel.getName());
            if (existingHotel.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorResponse("Ya existe un hotel con el nombre " + hotel.getName()));
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(hotelesService.guardarHoteles(hotel));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Error al crear el hotel: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateHotel(@PathVariable Long id, @RequestBody Hoteles hotel) {
        try {
            // Verificar si existe el hotel que queremos actualizar
            Optional<Hoteles> hotelToUpdate = hotelesRepository.findById(id);
            if (!hotelToUpdate.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("No existe un hotel con el ID " + id));
            }

            // Verificar si el nuevo nombre ya existe en otro hotel con diferente ID
            Optional<Hoteles> existingHotelWithName = hotelesRepository.findByNameAndDifferentId(hotel.getName(), id);
            if (existingHotelWithName.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorResponse("Ya existe otro hotel con el nombre " + hotel.getName()));
            }

            hotel.setId(id);
            return ResponseEntity.ok(hotelesService.actualizarHoteles(id, hotel));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Error al actualizar el hotel: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelesService.eliminarHoteles(id);
        return ResponseEntity.ok().build();
    }
}
