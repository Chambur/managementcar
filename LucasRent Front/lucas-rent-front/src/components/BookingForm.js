import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

function BookingForm({ onClose, onReservaCreada, booking }) {
  const [roomNumber, setRoomNumber] = useState(booking ? booking.roomNumber : '');
  const [fechaInicio, setFechaInicio] = useState(booking ? booking.fechaInicio : '');
  const [fechaFin, setFechaFin] = useState(booking ? booking.fechaFin : '');
  const [cocheID, setCocheID] = useState(booking ? booking.cocheID : '');
  const [hotelname, setHotelname] = useState(booking ? booking.hotelname : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para crear o actualizar la reserva
    onReservaCreada();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
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