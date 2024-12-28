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
  IconButton, 
  Grid, 
  useTheme, 
  useMediaQuery 
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

// Añade este estilo para el botón
const addButtonStyle = {
  background: (theme) => 
    theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #1a237e, #311b92)'
      : 'linear-gradient(45deg, #1976d2, #1565c0)',
  borderRadius: '28px',
  textTransform: 'none',
  px: 4,
  py: 1,
  fontSize: '1.1rem',
  fontWeight: 500,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  }
};

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [selectedBooking, setSelectedBooking] = useState(null); // Estado para la reserva seleccionada
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [cars, setCars] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
  const filteredBookings = bookings.filter(booking => {
    const carMatricula = getCarMatricula(booking.cocheID).toLowerCase();
    return carMatricula.includes(searchTerm.toLowerCase());
  });

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

  const renderMobileView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {filteredBookings.map((booking) => (
        <Paper
          key={booking.id}
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            background: theme => theme.palette.background.paper,
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Reserva #{booking.id}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {booking.hotelname}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                onClick={() => handleUpdateBooking(booking)}
                color="primary"
                size="small"
                sx={{ '&:hover': { backgroundColor: 'primary.light' } }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleDeleteBooking(booking.id)}
                color="error"
                size="small"
                sx={{ '&:hover': { backgroundColor: 'error.light' } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ 
                p: 1.5, 
                bgcolor: 'background.default', 
                borderRadius: 1,
                mb: 2
              }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Vehículo
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {getCarMatricula(booking.cocheID)} - {getCarModelo(booking.cocheID)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Habitación
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>
                {booking.roomNumber}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ 
                mt: 1,
                p: 1.5,
                bgcolor: 'background.default',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Fecha Inicio
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {parseCustomDate(booking.fechaInicio).toLocaleDateString('es-ES')}
                    {' '}
                    {formatTime(parseCustomDate(booking.fechaInicio))}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Fecha Fin
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {parseCustomDate(booking.fechaFin).toLocaleDateString('es-ES')}
                    {' '}
                    {formatTime(parseCustomDate(booking.fechaFin))}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {filteredBookings.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No se encontraron reservas.
          </Typography>
        </Paper>
      )}
    </Box>
  );

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
        {/* <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          Reservas
        </Typography> */}
        <Button 
          startIcon={<AddIcon />}
          variant="contained" 
          onClick={() => setShowForm(true)}
          sx={addButtonStyle}
        >
          Nueva Reserva
        </Button>
      </Box>
      
      
      {/* Buscador.. */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar por matrícula..."
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
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mb: 2,
          '& .MuiTextField-root': {
            backgroundColor: theme => 
              theme.palette.mode === 'dark'
                ? 'rgba(26, 32, 53, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
            boxShadow: theme => `0 4px 12px ${
              theme.palette.mode === 'dark'
                ? 'rgba(0,0,0,0.2)'
                : 'rgba(25, 70, 186, 0.1)'
            }`,
            width: 250,
            '& .MuiOutlinedInput-root': {
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
                borderWidth: '2px',
              }
            },
            '& .MuiInputLabel-root': {
              color: theme =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.7)'
                  : 'rgba(25, 70, 186, 0.7)',
              '&.Mui-focused': {
                color: theme =>
                  theme.palette.mode === 'dark'
                    ? '#1a237e'
                    : '#1565c0',
              }
            },
            '& .MuiIconButton-root': {
              color: theme =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.7)'
                  : 'rgba(25, 70, 186, 0.7)',
              '&:hover': {
                backgroundColor: theme =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(25, 70, 186, 0.05)',
              }
            },
            '& .MuiInputBase-input': {
              color: theme =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(0,0,0,0.9)',
            }
          }
        }}>
          <DatePicker
            views={['month', 'year']}
            label="Seleccionar Mes y Año"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slots={{ 
              openPickerIcon: CalendarMonthRoundedIcon,
            }}
            slotProps={{
              textField: {
                size: "small",
                InputProps: {
                  sx: {
                    '&:hover': {
                      '& .MuiIconButton-root': {
                        color: theme =>
                          theme.palette.mode === 'dark'
                            ? '#1a237e'
                            : '#1565c0',
                      }
                    }
                  }
                }
              }
            }}
          />
        </Box>
      </LocalizationProvider>

      {isMobile ? renderMobileView() : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 2,
            boxShadow: theme => `0 6px 20px ${
              theme.palette.mode === 'dark' 
                ? 'rgba(0,0,0,0.4)'
                : 'rgba(25, 70, 186, 0.15)'
            }`,
            overflow: 'auto',
            background: theme => 
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(26, 32, 53, 0.95) 0%, rgba(28, 35, 58, 0.95) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 245, 255, 0.95) 100%)',
            backdropFilter: 'blur(8px)',
            border: theme => 
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.05)'
                : '1px solid rgba(25, 70, 186, 0.1)',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          <Table sx={{ borderCollapse: 'separate', borderSpacing: '0' }}>
            <TableHead>
              <TableRow sx={{ 
                background: theme => 
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #1a237e 30%, #311b92 90%)'
                    : 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
                '& th': {
                  borderBottom: 'none',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  padding: '16px 8px',
                  '&:first-of-type': {
                    borderTopLeftRadius: '8px',
                    paddingLeft: '16px',
                  },
                  '&:last-child': {
                    borderTopRightRadius: '8px',
                    paddingRight: '16px',
                  }
                }
              }}>
                <TableCell sx={{ width: '8%' }}>Hab.</TableCell>
                <TableCell sx={{ width: '18%' }}>Desde</TableCell>
                <TableCell sx={{ width: '18%' }}>Hasta</TableCell>
                <TableCell sx={{ width: '28%' }}>Vehículo</TableCell>
                <TableCell sx={{ width: '20%' }}>Hotel</TableCell>
                <TableCell sx={{ width: '8%' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking, index) => (
                <TableRow 
                  key={booking.id} 
                  sx={{ 
                    transition: 'all 0.2s ease',
                    backgroundColor: theme => 
                      theme.palette.mode === 'dark'
                        ? index % 2 === 0 
                          ? 'rgba(255,255,255,0.02)'
                          : 'transparent'
                        : index % 2 === 0
                          ? 'rgba(25, 70, 186, 0.02)'
                          : 'transparent',
                    '&:hover': { 
                      backgroundColor: theme =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(25, 70, 186, 0.05)',
                      transform: 'translateY(-1px)',
                      boxShadow: theme =>
                        `0 4px 12px ${
                          theme.palette.mode === 'dark'
                            ? 'rgba(0,0,0,0.2)'
                            : 'rgba(25, 70, 186, 0.1)'
                        }`,
                    },
                    '& td': {
                      borderColor: 'transparent',
                      padding: '12px 8px',
                      fontSize: '0.95rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '&:first-of-type': {
                        paddingLeft: '16px',
                      },
                      '&:last-child': {
                        paddingRight: '16px',
                      }
                    }
                  }}
                >
                  <TableCell>
                    <Typography sx={{ 
                      fontWeight: 500, 
                      fontSize: '1.1rem'
                    }}>
                      {booking.roomNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ 
                      fontWeight: 500, 
                      fontSize: '1.1rem'
                    }}>
                      {parseCustomDate(booking.fechaInicio).toLocaleDateString('es-ES')} 
                      {' '}
                      {formatTime(parseCustomDate(booking.fechaInicio))}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ 
                      fontWeight: 500, 
                      fontSize: '1.1rem'
                    }}>
                      {parseCustomDate(booking.fechaFin).toLocaleDateString('es-ES')} 
                      {' '}
                      {formatTime(parseCustomDate(booking.fechaFin))}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ 
                      fontWeight: 500, 
                      fontSize: '1.1rem'
                    }}>
                      {getCarMatricula(booking.cocheID)} {getCarModelo(booking.cocheID)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ 
                      fontWeight: 500, 
                      fontSize: '1.1rem'
                    }}>
                      {booking.hotelname}
                    </Typography>
                  </TableCell>
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
                  <TableCell 
                    colSpan={6}
                    align="center" 
                    sx={{ 
                      py: 4,
                      color: 'text.secondary',
                      background: theme =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.02)'
                          : 'rgba(25, 70, 186, 0.02)',
                    }}
                  >
                    <Typography variant="body1" color="inherit">
                      No se encontraron reservas.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default BookingList; 