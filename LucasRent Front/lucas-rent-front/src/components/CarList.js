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
  Fab,
  Alert,
  TextField,
  InputAdornment
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
import { getCars, deleteCar } from '../services/api';

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      setError('');
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Cargando coches...</Typography>
      </Box>
    );
  }

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
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          Lista de Coches
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/cars/new')}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: 3
          }}
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

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Reservado</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Matrícula</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Modelo</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Color</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Nivel de Gasolina</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCars.map((car) => (
              <TableRow 
                key={car.id}
                sx={{ 
                  '&:hover': { backgroundColor: 'action.hover' },
                  backgroundColor: 'transparent',
                  color: 'black'
                }}
              >
                <TableCell>
                  {car.reservado ? <LockIcon color="error" /> : <CheckIcon color="success" />}
                </TableCell>
                <TableCell>
                  <Typography sx={{ 
                    fontWeight: 500, 
                    letterSpacing: 1,
                    fontSize: '1.1rem'
                  }}>
                    {car.matricula}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ 
                    fontWeight: 500,
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
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No se encontraron coches con esa matrícula
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

export default CarList; 