import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Button,
  Alert,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Lock as LockIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getCars, deleteCar, getTodayBookings, updateCarReservationStatus } from '../services/api';
import { format } from 'date-fns';

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

// Componente para la matrícula
const LicensePlate = ({ text }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '2px solid #000',
      borderRadius: '4px',
      padding: '4px 12px',
      position: 'relative',
      fontFamily: 'Consolas, monospace',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#000',
      minWidth: '120px',
      height: '30px',
      justifyContent: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '20px',
        height: '100%',
        background: 'linear-gradient(90deg, #0055aa 0%, #0055aa 100%)',
        borderTopLeftRadius: '2px',
        borderBottomLeftRadius: '2px',
      },
      '& span': {
        marginLeft: '8px',
        letterSpacing: '1px'
      }
    }}
  >
    <span>{text}</span>
  </Box>
);

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadCars();
  }, []);

  const parseCustomDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    
    // Crear un nuevo objeto Date
    return new Date(year, month - 1, day, hours, minutes); // month - 1 porque los meses en JavaScript son 0-indexados
  };

  const checkAndUpdateReservations = async () => {
    try {
      const todayBookings = await getTodayBookings();
      const now = new Date();

      for (const booking of todayBookings) {
        const startDate = parseCustomDate(booking.fechaInicio);
        const endDate = parseCustomDate(booking.fechaFin);

        if (now >= startDate && now <= endDate) {
          // La reserva está activa ahora
          await updateCarReservationStatus(booking.cocheID, true);
        } else if (now > endDate) {
          // La reserva ha terminado
          await updateCarReservationStatus(booking.cocheID, false);
        }
      }

      // Recargar la lista de coches para reflejar los cambios
      loadCars();
    } catch (error) {
      console.error('Error al comprobar reservas:', error);
      setError('Error al actualizar el estado de los coches');
    }
  };

  const loadCars = async () => {
    try {
      setLoading(true);
      setError('');
      await checkAndUpdateReservations(); // Primero actualizamos estados
      const data = await getCars();
      setCars(data);
    } catch (error) {
      console.error('Error al cargar los coches:', error);
      setError('Error al cargar los coches. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este coche?')) {
      try {
        await deleteCar(id);
        loadCars();
      } catch (error) {
        console.error('Error al eliminar el coche:', error);
      }
    }
  };

  // Función auxiliar para mostrar el texto más amigable
  const getNivelGasolinaLabel = (nivel) => {
    const labels = {
      'VACIO': '0/4',
      'CUARTO': '1/4',
      'MEDIO': '2/4',
      'TRES_CUARTOS': '3/4',
      'LLENO': '4/4'
    };
    return labels[nivel] || nivel;
  };

  // Filtrar los coches basado en el término de búsqueda
  const filteredCars = cars.filter(car => 
    car.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMobileView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {filteredCars.map((car) => (
        <Paper
          key={car.id}
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
            <LicensePlate text={car.matricula} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                onClick={() => navigate(`/cars/edit/${car.id}`)}
                color="primary"
                size="small"
                sx={{ '&:hover': { backgroundColor: 'primary.light' } }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => handleDelete(car.id)}
                color="error"
                size="small"
                sx={{ '&:hover': { backgroundColor: 'error.light' } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Estado</Typography>
              {car.reservado ? 
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main', gap: 0.5 }}>
                  <LockIcon fontSize="small" />
                  <Typography>Reservado</Typography>
                </Box> : 
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main', gap: 0.5 }}>
                  <CheckIcon fontSize="small" />
                  <Typography>Disponible</Typography>
                </Box>
              }
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Modelo</Typography>
              <Typography>{car.modelo}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Color</Typography>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                backgroundColor: car.color,
                border: '2px solid #ddd',
                borderRadius: 2,
                boxShadow: 1
              }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Nivel de Gasolina</Typography>
              <Box sx={{
                backgroundColor: 'action.hover',
                px: 2,
                py: 1,
                borderRadius: 1,
                display: 'inline-block',
                fontWeight: 500
              }}>
                {getNivelGasolinaLabel(car.nivelGasolina)}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {filteredCars.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No se encontraron coches con esa matrícula
          </Typography>
        </Paper>
      )}
    </Box>
  );

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
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
          Coches
        </Typography> */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/cars/new')}
          sx={addButtonStyle}
        >
          Nuevo Coche
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por matrícula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
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
      </Box>

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
                <TableCell sx={{ width: '10%' }}>Estado</TableCell>
                <TableCell sx={{ width: '20%' }}>Matrícula</TableCell>
                <TableCell sx={{ width: '25%' }}>Modelo</TableCell>
                <TableCell sx={{ width: '15%' }}>Color</TableCell>
                <TableCell sx={{ width: '20%' }}>Gasolina</TableCell>
                <TableCell sx={{ width: '10%' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCars.map((car, index) => (
                <TableRow 
                  key={car.id}
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
                    {car.reservado ? <LockIcon color="error" /> : <CheckIcon color="success" />}
                  </TableCell>
                  <TableCell>
                    <LicensePlate text={car.matricula} />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ 
                      fontWeight: 500, 
                      letterSpacing: 1,
                      fontSize: '1.1rem'
                    }}>
                      {car.modelo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      backgroundColor: car.color,
                      border: '2px solid #ddd',
                      borderRadius: 2,
                      boxShadow: 1
                    }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{
                      backgroundColor: 'action.hover',
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      display: 'inline-block',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      letterSpacing: 0.5,
                      color: 'text.primary',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      {getNivelGasolinaLabel(car.nivelGasolina)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => navigate(`/cars/edit/${car.id}`)}
                      color="primary"
                      sx={{ 
                        mr: 1,
                        '&:hover': {
                          backgroundColor: 'primary.light'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(car.id)}
                      color="error"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'error.light'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCars.length === 0 && (
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
                      No se encontraron coches con esa matrícula
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

export default CarList; 