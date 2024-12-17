package com.lucas.fuel.LucasRent.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lucas.fuel.LucasRent.model.Booking;
import com.lucas.fuel.LucasRent.repository.CocheRepository;
import com.lucas.fuel.LucasRent.service.CocheService;

import java.time.LocalDate;

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

    // Constructor vacío
    public BookingDTO() {}

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Long getCocheId() {
        return cocheId;
    }

    public void setCocheId(Long cocheId) {
        this.cocheId = cocheId;
    }

    // Método auxiliar para convertir de DTO a entidad Booking
    public Booking toEntity(Coche coche) {
        Booking booking = new Booking();
        booking.setId(this.id);
        booking.setRoomNumber(this.roomNumber);
        booking.setFechaInicio(this.fechaInicio);
        booking.setFechaFin(this.fechaFin);
        booking.setCoche(coche);
        return booking;
    }
    
}
