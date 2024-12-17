package com.lucas.fuel.LucasRent.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@Entity
@Table(name = "coches")
public class Coche implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String matricula;
    
    private String modelo;
    
    private String color;

    private boolean reservado=false;
    
    @Enumerated(EnumType.STRING)
    private NivelGasolina nivelGasolina;

    @OneToMany(mappedBy = "coche")
    //@JsonBackReference
    @JsonIgnore
    private List<Booking> bookings;

    public Long getId() {
        return id;
    }

} 