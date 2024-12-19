package com.lucas.fuel.LucasRent.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lucas.fuel.LucasRent.model.Booking;
import com.lucas.fuel.LucasRent.service.BookingService;
import com.lucas.fuel.LucasRent.service.CocheService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final CocheService cocheService;
    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    //Reupdated
    // Método GET: Devuelve una lista de Booking
    @GetMapping
    public ResponseEntity<List<Booking>> obtainAllBookings() {
        List<Booking> bookings = bookingService.obteinallBookings();
        return ResponseEntity.ok(bookings);
    }
    //Endpoint para rescatar las reservas de HOY 
    @GetMapping("/today")
    public ResponseEntity<List<Booking>> getBookingForToday(){
        List<Booking> bookings = bookingService.findBookingsForToday();
        return ResponseEntity.ok(bookings);
    }
    

    // Método POST: Crea una nueva reserva
    @PostMapping
    public ResponseEntity<Booking> createNewBooking(@RequestBody Booking booking) {
        try {
            // Mostrar los datos recibidos en la consola usando logger
            logger.info("Datos recibidos: {}", booking);

            // Validamos que el coche existe
            if (cocheService.findById(booking.getCocheID()) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Coche no encontrado
            }

            // Crear la reserva
            Booking createdBooking = bookingService.newBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
        } catch (Exception e) {
            logger.error("Error al crear la reserva: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Método PUT: Actualiza una reserva por ID
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        try {
            // Validar que el coche existe
            if (cocheService.findById(booking.getCocheID()) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Coche no encontrado
            }

            // Actualizar la reserva
            booking.setId(id); // Asegúrate de que el ID se establece correctamente
            Booking updatedBooking = bookingService.updateBooking(id, booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Método DELETE: Elimina una reserva por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok().build();
    }
}
