package com.lucas.fuel.LucasRent.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lucas.fuel.LucasRent.model.Booking;


public interface BookingRepository extends JpaRepository<Booking, Long> {
    //boolean existsByBooking(Long id);
    //Optional<Booking> findByList<Booking> findById(Long id);
    Optional<Booking> findById(Long id);


} 