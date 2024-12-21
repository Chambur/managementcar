import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { createBooking, updateBooking } from '../services/api'; // Importar la nueva función de actualización

function BookingForm({ onClose, onReservaCreada, booking }) {
  // Valores por defecto
  const today = new Date();
  const defaultRoomNumber = '103';
  const defaultFechaFin = new Date(today);
  defaultFechaFin.setDate(today.getDate() + 22 - today.getDate()); // Establecer fechaFin para el día 22
  const defaultCocheID = '2';
  const defaultHotelname = 'Hotel de pruebas';

  const [roomNumber, setRoomNumber] = useState(defaultRoomNumber);
  const [fechaInicio, setFechaInicio] = useState(today.toISOString().slice(0, 16)); // Formato YYYY-MM-DDTHH:mm
  const [fechaFin, setFechaFin] = useState(defaultFechaFin.toISOString().slice(0, 16)); // Formato YYYY-MM-DDTHH:mm
  const [cocheID, setCocheID] = useState(defaultCocheID);
  const [hotelname, setHotelname] = useState(defaultHotelname);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    if (booking) {
      setRoomNumber(booking.roomNumber);
      setFechaInicio(booking.fechaInicio.slice(0, 16)); // Formato adecuado
      setFechaFin(booking.fechaFin.slice(0, 16)); // Formato adecuado
      setCocheID(booking.cocheID);
      setHotelname(booking.hotelname);
    }
  }, [booking]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`; // Formato dd-MM-yyyy HH:mm
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      roomNumber: parseInt(roomNumber, 10),
      fechaInicio: formatDateTime(fechaInicio.replace('T', ' ')),
      fechaFin: formatDateTime(fechaFin.replace('T', ' ')),
      cocheID: parseInt(cocheID, 10),
      hotelname,
    };

    try {
      if (booking) {
        // Llamar a la función de actualización si se está editando una reserva
        console.log("Actualizar reserva");
        await updateBooking(booking.id, bookingData);
      } else {
        // Llamar a la función de creación si es una nueva reserva
        console.log("CRear reserva");
        await createBooking(bookingData);
      }
      onReservaCreada(); // Notificar que se ha creado/actualizado la reserva
      onClose(); // Cerrar el formulario
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      setError('Error al procesar la reserva.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
      <TextField
        label="Número de Habitación"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Fecha Inicio"
        type="datetime-local"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Fecha Fin"
        type="datetime-local"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Coche ID"
        value={cocheID}
        onChange={(e) => setCocheID(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Nombre del Hotel"
        value={hotelname}
        onChange={(e) => setHotelname(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {booking ? 'Actualizar Reserva' : 'Crear Reserva'}
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancelar
      </Button>
    </form>
  );
}

export default BookingForm;
