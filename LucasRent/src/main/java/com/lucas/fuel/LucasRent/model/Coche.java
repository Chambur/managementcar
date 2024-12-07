package com.lucas.fuel.LucasRent.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "coches")
public class Coche {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String matricula;
    
    private String modelo;
    
    private String color;
    
    @Enumerated(EnumType.STRING)
    private NivelGasolina nivelGasolina;
} 