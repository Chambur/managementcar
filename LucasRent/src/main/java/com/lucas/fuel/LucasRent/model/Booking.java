package com.lucas.fuel.LucasRent.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "booking")


public class Booking implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Integer roomNumber;

    // Serializa las fechas en el formato "día/mes/año"
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate fechaInicio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate fechaFin;

    @ManyToOne
    @JoinColumn(name = "coche_id" /* , nullable = false*/)
    //@JsonManagedReference
    private Coche coche;

    public void setCoche(Coche coche) {
        this.coche = coche;
    }
    
}

