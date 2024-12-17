package com.lucas.fuel.LucasRent.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingDTO {

    private Long id;
    private int roomNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy") // Asegura el mismo formato que en Booking
    private LocalDate fechaInicio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate fechaFin;

    private Long cocheId; // Solo el ID del coche

    // Constructor completo
    public BookingDTO(Long id, int roomNumber, LocalDate fechaInicio, LocalDate fechaFin, Long cocheId) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.cocheId = cocheId;
    }

    // Método auxiliar para convertir de DTO a entidad Booking
    public Booking toEntity(Coche coche) {
        Booking booking = new Booking();
        booking.setId(this.id);
        booking.setRoomNumber(this.roomNumber);
        booking.setFechaInicio(this.fechaInicio);
        booking.setFechaFin(this.fechaFin);
        //booking.setCoche(coche);
        return booking;
    }
    
}
