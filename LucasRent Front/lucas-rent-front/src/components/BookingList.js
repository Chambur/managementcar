import { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Dialog, 
  DialogContent, 
  TextField, 
  InputAdornment, 
  Alert, 
  IconButton 
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

import { deleteBooking, getCars, getBookingsmonth } from '../services/api';
import CrearReserva from './BookingForm'; // Importar el nuevo componente
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, } from '@mui/icons-material';
import { format } from 'date-fns'; // Asegúrate de importar parseISO y format

import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { es } from 'date-fns/locale/es';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [selectedBooking, setSelectedBooking] = useState(null); // Estado para la reserva seleccionada
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [cars, setCars] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

 // Define `loadBookings` primero
const loadBookings = useCallback(async () => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  //console.log("este es el año:" + year + " este es el mes:" + month);
  try {
    setLoading(true);
    setError('');
    const data = await getBookingsmonth(year, month);
    setBookings(data);
  } catch (error) {
    console.error('', error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
}, [selectedDate]);

// `useEffect` para cargar los coches
useEffect(() => {
  const fetchCars = async () => {
    try {
      const data = await getCars();
      setCars(data); // Guardamos los coches en el estado
    } catch (error) {
      console.error('Error al cargar los coches:', error);
      setError(error.message);
    }
  };
  fetchCars();
}, []); // Solo se ejecuta una vez al montar el componente

// `useEffect` para cargar las reservas al cambiar `selectedDate`
useEffect(() => {
  loadBookings();
}, [loadBookings]);


  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedBooking(null); // Limpiar la reserva seleccionada
  };

  const getCarMatricula = (cocheID) => {
    const car = cars.find((car) => car.id === cocheID); // Buscamos el coche por id
    return car ? car.matricula : 'Coche no encontrado'; // Devolvemos la matrícula o un mensaje de error
  };
  const getCarModelo = (cocheID) => {
    const car = cars.find((car) => car.id === cocheID); // Buscamos el coche por id
    return car ? car.modelo : 'Coche no encontrado'; // Devolvemos la matrícula o un mensaje de error
  };
  

  const handleDeleteBooking = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta reserva?')) {
      try {
        await deleteBooking(id);
        loadBookings(); // Recargar BookingList después de eliminar
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
      }
    }
  };

  const handleUpdateBooking = (booking) => {
    // Parsear las fechas al formato que puede leer date-fns
    const updatedBooking = {
      ...booking,
      fechaInicio: format(parseCustomDate(booking.fechaInicio), 'yyyy-MM-dd\'T\'HH:mm'), // Formato adecuado
      fechaFin: format(parseCustomDate(booking.fechaFin), 'yyyy-MM-dd\'T\'HH:mm') // Formato adecuado
    };
    setSelectedBooking(updatedBooking); // Establecer la reserva seleccionada
    setShowForm(true); // Mostrar el formulario
  };

  const handleReservaCreada = () => {
    loadBookings(); // Recargar BookingList después de crear
  };

  // Filtrar las reservas basado en el término de búsqueda
  const filteredBookings = bookings.filter(booking => 
    String(booking.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const parseCustomDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    
    // Crear un nuevo objeto Date
    return new Date(year, month - 1, day, hours, minutes); // month - 1 porque los meses en JavaScript son 0-indexados
  };

  // Función para formatear la hora
  const formatTime = (date) => {
    return format(date, 'HH:mm'); // Formato de 24 horas
  };

  if (loading) {
    return <Typography>Cargando reservas...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        backgroundColor: 'background.paper',
        p: 2,
        borderRadius: 1,
        boxShadow: 1
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          Lista de Reservas
        </Typography>
        <Button 
        startIcon={<AddIcon />}
        variant="contained" 
        onClick={() => setShowForm(true)} 
        sx={{ 
          borderRadius: 2,
          textTransform: 'none',
          px: 3
        }} // Botón a la derecha
      >
        Crear Reserva
      </Button>
      </Box>
      
      
      {/* Buscador.. */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar por ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& input': {
            fontSize: '1.1rem',
            padding: '12px 16px',
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth={true} sx={{
    '& .MuiDialog-container': {
     
    },
  }}>
        <DialogContent sx={{  }}>
          <CrearReserva 
            onClose={handleCloseForm}
            onReservaCreada={handleReservaCreada} 
            booking={selectedBooking} // Pasar la reserva seleccionada para actualizar
          />
        </DialogContent>
      </Dialog>

      {/* Componente del calendario date-fns */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <DatePicker
          views={['month', 'year']}
          label="Seleccionar Mes y Año"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)} // Solo actualiza la fecha seleccionada
          renderInput={(params) => <TextField {...params} fullWidth />}
          slots={{ openPickerIcon: CalendarMonthRoundedIcon }}
        />
      </Box>

      {/* Renderiza las reservas aquí */}
    </LocalizationProvider>

          
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Habitación</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Fecha Inicio</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Fecha Fin</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Vehículo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Nombre del Hotel</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>{booking.id}</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>{booking.roomNumber}</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                  {parseCustomDate(booking.fechaInicio).toLocaleDateString('es-ES')} 
                  {' '}
                  {formatTime(parseCustomDate(booking.fechaInicio))}
                </TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                  {parseCustomDate(booking.fechaFin).toLocaleDateString('es-ES')} 
                  {' '}
                  {formatTime(parseCustomDate(booking.fechaFin))}
                </TableCell>
                {/* <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>{booking.cocheID}</TableCell> */}
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
                  {getCarMatricula(booking.cocheID)} {/* Mostramos la matrícula del coche */}
                  {getCarModelo(booking.cocheID)}
                </TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>{booking.hotelname}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdateBooking(booking)} color="primary" sx={{ 
                      mr: 1,
                      '&:hover': {
                        backgroundColor: 'primary.light'
                      }
                    }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteBooking(booking.id)} color="error" sx={{
                      '&:hover': {
                        backgroundColor: 'error.light'
                      }
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredBookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No se encontraron reservas.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BookingList; 