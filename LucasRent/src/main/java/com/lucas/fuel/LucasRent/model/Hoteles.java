package com.lucas.fuel.LucasRent.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name ="hotels")

public class Hoteles {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;
    private String address;
    private String hotelphone;
    
}
