package com.lucas.fuel.LucasRent.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import com.lucas.fuel.LucasRent.model.Booking;
import com.lucas.fuel.LucasRent.model.Coche;
import com.lucas.fuel.LucasRent.repository.BookingRepository;
import com.lucas.fuel.LucasRent.repository.CocheRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor


public class BookingService {
    private final BookingRepository bookingRepository;
    private final CocheRepository cocheRepository;

    public List<Booking> obteinallBookings() {
        return bookingRepository.findAll();
    }

    public Booking newBooking(Booking booking) {
        if (booking.getCocheID() != null && booking.getCocheID() != null) {
            Coche cocheExistente = cocheRepository.findById(booking.getCocheID())
                .orElseThrow(() -> new RuntimeException("Coche no encontrado"));
            booking.setCocheID(cocheExistente.getId());
            //cocheExistente.setReservado(true);
        }
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking booking) {
        Booking existBooking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking no encontrado"));
            
        existBooking.setFechaInicio(booking.getFechaInicio());
        existBooking.setFechaFin(booking.getFechaFin());
        existBooking.setCocheID(booking.getCocheID());
        existBooking.setHotelname(booking.getHotelname());
        existBooking.setRoomNumber(booking.getRoomNumber());
        return bookingRepository.save(existBooking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public List<Booking> findBookingsForToday(){
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59);
        return bookingRepository.findByFechaInicioBetween(startOfDay, endOfDay);
    }
}
