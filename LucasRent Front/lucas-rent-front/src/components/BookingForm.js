import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { createBooking } from '../services/api'; // Asegúrate de que la ruta sea correcta

function BookingForm({ onClose, onReservaCreada, booking }) {
  // Establecer valores por defecto
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
      setFechaInicio(booking.fechaInicio.slice(0, 16)); // Asegúrate de que esté en el formato correcto
      setFechaFin(booking.fechaFin.slice(0, 16)); // Asegúrate de que esté en el formato correcto
      setCocheID(booking.cocheID);
      setHotelname(booking.hotelname);
    }
  }, [booking]); // Solo se ejecuta cuando `booking` cambia

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
    console.log("Estoy entrando a la reserva");

    // Crear un objeto con los datos de la reserva
    const bookingData = {
      roomNumber: parseInt(roomNumber, 10), // Convertir a entero
      fechaInicio: formatDateTime(fechaInicio.replace('T', ' ')), // Formatear la fecha y hora
      fechaFin: formatDateTime(fechaFin.replace('T', ' ')), // Formatear la fecha y hora
      cocheID: parseInt(cocheID, 10), // Convertir a entero
      hotelname,
    };

    // Mostrar el JSON en la consola (exactamente lo que se envía al backend)
    console.log(JSON.stringify(bookingData, null, 2));

    try {
      // Llamar a la API para crear la reserva
      await createBooking(bookingData);
      onReservaCreada(); // Notificar que se ha creado la reserva
      onClose(); // Cerrar el formulario
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      setError('Error al crear la reserva.'); // Manejar el error
    }
  };

  const handleFechaInicioChange = (e) => {
    const value = e.target.value;
    setFechaInicio(value); // Establecer el valor directamente
  };

  const handleFechaFinChange = (e) => {
    const value = e.target.value;
    setFechaFin(value); // Establecer el valor directamente
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
        onChange={handleFechaInicioChange}
        fullWidth
        required
      />
      <TextField
        label="Fecha Fin"
        type="datetime-local"
        value={fechaFin}
        onChange={handleFechaFinChange}
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