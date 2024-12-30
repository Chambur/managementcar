package com.lucas.fuel.LucasRent.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lucas.fuel.LucasRent.model.Booking;
import java.time.LocalDateTime;



public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findById(Long id);
    List<Booking> findByFechaInicioBetween(LocalDateTime start, LocalDateTime end);
    Optional<Booking> findByRoomNumberAndFechaInicioAndFechaFin(Integer roomNumber, LocalDateTime fechaInicio, LocalDateTime fechaFin);
    boolean existsByRoomNumberAndFechaInicioAndFechaFin(Integer roomNumber, LocalDateTime fechaInicio, LocalDateTime fechaFin);
    
    // // Método para verificar si un coche está reservado en un rango de fechas
    // List<Booking> findByCocheIDAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(Long cocheID, LocalDateTime fechaFin, LocalDateTime fechaInicio);

    // Método modificado para excluir la reserva que se está editando
    List<Booking> findByCocheIDAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqualAndIdNot(
        Long cocheID, 
        LocalDateTime fechaFin, 
        LocalDateTime fechaInicio,
        Long bookingId
    );

} 