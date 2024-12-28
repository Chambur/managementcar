import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { createBooking, updateBooking, getCars, getHotels } from '../services/api';

function BookingForm({ onClose, onReservaCreada, booking }) {
  const today = new Date();
  const defaultRoomNumber = '103';
  const defaultFechaFin = new Date(today);
  defaultFechaFin.setDate(today.getDate() + 25 - today.getDate());
  const defaultHotelname = 'Hotel de pruebas';

  const [roomNumber, setRoomNumber] = useState(defaultRoomNumber);
  const [fechaInicio, setFechaInicio] = useState(today.toISOString().slice(0, 16));
  const [fechaFin, setFechaFin] = useState(defaultFechaFin.toISOString().slice(0, 16));
  const [hotelname, setHotelname] = useState(defaultHotelname);
  const [cocheID, setCocheID] = useState('');
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState([]);


  useEffect(() => {
    // Función para obtener los coches
    const fetchCars = async () => {
      try {
        const response = await getCars();
        setCars(response);
      } catch (err) {
        console.error('Error al obtener los coches:', err);
        setError('No se pudieron cargar los coches disponibles.');
      }
    };
  
    // Función para obtener los hoteles
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        setHotels(response);
      } catch (err) {
        console.error('Error al obtener los hoteles:', err);
        setError('No se pudieron cargar los hoteles disponibles.');
      }
    };
  
    // Si existe una reserva, setea los valores del formulario
    if (booking) {
      setRoomNumber(booking.roomNumber);
      setFechaInicio(booking.fechaInicio.slice(0, 16));
      setFechaFin(booking.fechaFin.slice(0, 16));
      setCocheID(booking.cocheID);
      setHotelname(booking.hotelname);
    }
  
    // Llamadas a las funciones para cargar coches y hoteles
    fetchCars();
    fetchHotels();
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
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          mt: 3,
          mb: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            background: theme => 
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(26, 32, 53, 0.95) 0%, rgba(28, 35, 58, 0.95) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 245, 255, 0.95) 100%)',
            backdropFilter: 'blur(8px)',
            border: theme => 
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.05)'
                : '1px solid rgba(25, 70, 186, 0.1)',
            boxShadow: theme => `0 6px 20px ${
              theme.palette.mode === 'dark' 
                ? 'rgba(0,0,0,0.4)'
                : 'rgba(25, 70, 186, 0.15)'
            }`,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme => 
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.9)'
                  : '#1565c0',
              mb: 4,
              letterSpacing: '0.5px',
            }}
          >
            {booking ? 'Editar Reserva' : 'Nueva Reserva'}
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                backgroundColor: theme =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(211, 47, 47, 0.15)'
                    : 'rgba(211, 47, 47, 0.05)',
                border: '1px solid rgba(211, 47, 47, 0.2)',
                '& .MuiAlert-icon': {
                  color: '#d32f2f',
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3 
            }}
          >
            <TextField
              required
              label="Número de Habitación"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              fullWidth
              sx={textFieldStyle}
            />

            <TextField
              required
              label="Fecha Inicio"
              type="datetime-local"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              fullWidth
              sx={textFieldStyle}
            />

            <TextField
              required
              label="Fecha Fin"
              type="datetime-local"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              fullWidth
              sx={textFieldStyle}
            />

            <FormControl fullWidth>
              <InputLabel sx={selectLabelStyle}>Vehículo</InputLabel>
              <Select
                value={cocheID}
                onChange={(e) => setCocheID(e.target.value)}
                sx={selectStyle}
                MenuProps={{
                  PaperProps: {
                    sx: menuPaperStyle
                  }
                }}
              >
                {cars.map((car) => (
                  <MenuItem 
                    key={car.id} 
                    value={car.id}
                    sx={menuItemStyle}
                  >
                    {`${car.matricula} - ${car.modelo}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={selectLabelStyle}>Hotel</InputLabel>
              <Select
                value={hotelname}
                onChange={(e) => setHotelname(e.target.value)}
                sx={selectStyle}
                MenuProps={{
                  PaperProps: {
                    sx: menuPaperStyle
                  }
                }}
              >
                {hotels.map((hotel) => (
                  <MenuItem 
                    key={hotel.id} 
                    value={hotel.name}
                    sx={menuItemStyle}
                  >
                    {hotel.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                mt: 2,
                display: 'flex',
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: '28px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  background: theme => 
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #1a237e 30%, #311b92 90%)'
                      : 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                  }
                }}
              >
                {booking ? 'Actualizar Reserva' : 'Crear Reserva'}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={onClose}
                sx={{
                  py: 1.5,
                  borderRadius: '28px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                  }
                }}
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

// Estilos comunes para los campos de texto
const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    backgroundColor: theme =>
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : 'rgba(255,255,255,0.7)',
    '& fieldset': {
      borderColor: theme =>
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(25, 70, 186, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: theme =>
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.2)'
          : 'rgba(25, 70, 186, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme =>
        theme.palette.mode === 'dark'
          ? '#1a237e'
          : '#1565c0',
    }
  }
};

// Estilos para los selects
const selectStyle = {
  ...textFieldStyle,
  '& .MuiSelect-select': {
    padding: '13px 14px',
  }
};

// Estilos para las etiquetas de los selects
const selectLabelStyle = {
  backgroundColor: 'transparent',
  px: 1,
};

// Estilos para el menú desplegable
const menuPaperStyle = {
  mt: 1,
  borderRadius: 2,
  backgroundColor: theme =>
    theme.palette.mode === 'dark'
      ? 'rgba(26, 32, 53, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  boxShadow: theme => `0 6px 20px ${
    theme.palette.mode === 'dark' 
      ? 'rgba(0,0,0,0.4)'
      : 'rgba(25, 70, 186, 0.15)'
  }`,
};

// Estilos para los items del menú
const menuItemStyle = {
  '&:hover': {
    backgroundColor: theme =>
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : 'rgba(25, 70, 186, 0.05)',
  },
  '&.Mui-selected': {
    backgroundColor: theme =>
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.1)'
        : 'rgba(25, 70, 186, 0.1)',
    '&:hover': {
      backgroundColor: theme =>
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.15)'
          : 'rgba(25, 70, 186, 0.15)',
    }
  }
};

export default BookingForm;
