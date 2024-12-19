import { useState, useEffect } from 'react';
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
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  InputAdornment, 
  Alert, 
  IconButton 
} from '@mui/material';
import { getBookings, deleteBooking } from '../services/api';
import CrearReserva from './BookingForm'; // Importar el nuevo componente
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns'; // Asegúrate de importar parseISO y format

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [selectedBooking, setSelectedBooking] = useState(null); // Estado para la reserva seleccionada
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      setError('Error al cargar las reservas.');
    } finally {
      setLoading(false);
    }
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
    setSelectedBooking(booking); // Establecer la reserva seleccionada
    setShowForm(true); // Mostrar el formulario
  };

  const handleReservaCreada = () => {
    loadBookings(); // Recargar BookingList después de crear
  };

  // Filtrar las reservas basado en el término de búsqueda
  const filteredBookings = bookings.filter(booking => 
    String(booking.roomNumber).toLowerCase().includes(searchTerm.toLowerCase())
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
      <Typography variant="h4" sx={{ mb: 2 }}>Lista de Reservas</Typography>
      <Button 
        variant="contained" 
        onClick={() => setShowForm(true)} 
        sx={{ float: 'right', mb: 2 }} // Botón a la derecha
      >
        Crear Reserva
      </Button>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar por número de habitación..."
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
      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>{selectedBooking ? 'Actualizar Reserva' : 'Crear Reserva'}</DialogTitle>
        <DialogContent>
          <CrearReserva 
            onClose={() => setShowForm(false)} 
            onReservaCreada={handleReservaCreada} 
            booking={selectedBooking} // Pasar la reserva seleccionada para actualizar
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Habitación</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Fecha Inicio</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Fecha Fin</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Coche</TableCell>
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
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>{booking.cocheID}</TableCell>
                <TableCell sx={{ fontWeight: 500, fontSize: '1.1rem' }}>{booking.hotelname}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdateBooking(booking)} color="primary" sx={{ mr: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteBooking(booking.id)} color="error">
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