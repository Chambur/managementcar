package com.lucas.fuel.LucasRent.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lucas.fuel.LucasRent.model.Booking;
import java.time.LocalDateTime;



public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findById(Long id);
    List<Booking> findByFechaInicioBetween(LocalDateTime start, LocalDateTime end);

} 