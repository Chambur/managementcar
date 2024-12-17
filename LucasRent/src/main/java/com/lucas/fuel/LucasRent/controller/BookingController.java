package com.lucas.fuel.LucasRent.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lucas.fuel.LucasRent.model.Booking;
import com.lucas.fuel.LucasRent.model.BookingDTO;
import com.lucas.fuel.LucasRent.model.Coche;
import com.lucas.fuel.LucasRent.service.BookingService;
import com.lucas.fuel.LucasRent.service.CocheService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final CocheService cocheService;

    // Método GET: Devuelve una lista de BookingDTO
    @GetMapping
    public ResponseEntity<List<BookingDTO>> obteinAllBookings() {
        List<BookingDTO> bookingDTOs = bookingService.obteinallBookings()
                .stream()
                .map(booking -> new BookingDTO(
                        booking.getId(),
                        booking.getRoomNumber(),
                        booking.getFechaInicio(),
                        booking.getFechaFin(),
                        booking.getCoche().getId()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(bookingDTOs);
    }

    // Método POST: Crea una nueva reserva desde un DTO
    @PostMapping
    public ResponseEntity<Booking> createNewBooking(@RequestBody BookingDTO bookingDTO) {
        try {
            // Buscar coche utilizando el servicio
            Coche coche = cocheService.findById(bookingDTO.getCocheId());
            
            // Crear la entidad Booking
            Booking booking = new Booking();
            booking.setCoche(coche);
            booking.setFechaInicio(bookingDTO.getFechaInicio());
            booking.setFechaFin(bookingDTO.getFechaFin());
            booking.setRoomNumber(bookingDTO.getRoomNumber());
            
            Booking createdBooking = bookingService.newBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Método PUT: Actualiza una reserva por ID
    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody BookingDTO bookingDTO) {
        try {
            // Buscar coche utilizando el servicio
            Coche coche = cocheService.findById(bookingDTO.getCocheId());

            // Convertir el DTO a entidad
            Booking booking = new Booking();
            booking.setId(id);
            booking.setRoomNumber(bookingDTO.getRoomNumber());
            booking.setFechaInicio(bookingDTO.getFechaInicio());
            booking.setFechaFin(bookingDTO.getFechaFin());
            booking.setCoche(coche);

            // Actualizar la reserva
            Booking updatedBooking = bookingService.updateBooking(id, booking);

            // Convertir la entidad actualizada a DTO para la respuesta
            BookingDTO updatedBookingDTO = new BookingDTO(
                    updatedBooking.getId(),
                    updatedBooking.getRoomNumber(),
                    updatedBooking.getFechaInicio(),
                    updatedBooking.getFechaFin(),
                    updatedBooking.getCoche().getId()
            );

            return ResponseEntity.ok(updatedBookingDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Método DELETE: Elimina una reserva por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deteleBooking(id);
        return ResponseEntity.ok().build();
    }
}
