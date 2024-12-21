import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert
} from '@mui/material';
import { createBooking, updateBooking } from '../services/api';

function BookingForm({ onClose, onReservaCreada, booking }) {
  const today = new Date();
  const defaultRoomNumber = '103';
  const defaultFechaFin = new Date(today);
  defaultFechaFin.setDate(today.getDate() + 22 - today.getDate());
  const defaultCocheID = '2';
  const defaultHotelname = 'Hotel de pruebas';

  const [roomNumber, setRoomNumber] = useState(defaultRoomNumber);
  const [fechaInicio, setFechaInicio] = useState(today.toISOString().slice(0, 16));
  const [fechaFin, setFechaFin] = useState(defaultFechaFin.toISOString().slice(0, 16));
  const [cocheID, setCocheID] = useState(defaultCocheID);
  const [hotelname, setHotelname] = useState(defaultHotelname);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (booking) {
      setRoomNumber(booking.roomNumber);
      setFechaInicio(booking.fechaInicio.slice(0, 16));
      setFechaFin(booking.fechaFin.slice(0, 16));
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
    return `${day}-${month}-${year} ${hours}:${minutes}`;
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
        await updateBooking(booking.id, bookingData);
      } else {
        await createBooking(bookingData);
      }
      onReservaCreada();
      onClose();
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      setError('Error al procesar la reserva.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'medium',
              color: 'primary.main',
              mb: 3
            }}
          >
            {booking ? 'Editar Reserva' : 'Nueva Reserva'}
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              required
              label="Número de Habitación"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              required
              label="Fecha Inicio"
              type="datetime-local"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              required
              label="Fecha Fin"
              type="datetime-local"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              required
              label="Coche ID"
              value={cocheID}
              onChange={(e) => setCocheID(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              required
              label="Nombre del Hotel"
              value={hotelname}
              onChange={(e) => setHotelname(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                gap: 2,
                '& button': {
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: 'none'
                }
              }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
              >
                {booking ? 'Actualizar Reserva' : 'Crear Reserva'}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={onClose}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default BookingForm;
