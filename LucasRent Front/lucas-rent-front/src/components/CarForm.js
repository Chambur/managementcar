import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper,
  MenuItem,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createCar, updateCar, getCars } from '../services/api';

const NIVELES_GASOLINA = [
  'VACIO',
  'CUARTO',
  'MEDIO',
  'TRES_CUARTOS',
  'LLENO'
];

function CarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [car, setCar] = useState({
    matricula: '',
    modelo: '',
    color: '#000000',
    nivelGasolina: 'LLENO'
  });

  useEffect(() => {
    if (id) {
      loadCar();
    }
  }, [id]);

  const loadCar = async () => {
    try {
      const cars = await getCars();
      const carToEdit = cars.find(c => c.id === parseInt(id));
      if (carToEdit) {
        setCar(carToEdit);
      } else {
        setError('Coche no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar el coche:', error);
      setError('Error al cargar el coche');
    }
  };

  const handleChange = (e) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await updateCar(id, car);
      } else {
        await createCar(car);
      }
      navigate('/cars');
    } catch (error) {
      console.error('Error al guardar el coche:', error);
      const errorMessage = !id 
        ? 'Error al crear el coche. Compruebe que la matrícula no esté ya en la lista.'
        : 'Error al actualizar el coche. Por favor, intente de nuevo.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 4, 
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
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
            {id ? 'Editar Coche' : 'Nuevo Coche'}
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
              name="matricula"
              label="Matrícula"
              value={car.matricula}
              onChange={handleChange}
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <TextField
              required
              name="modelo"
              label="Modelo"
              value={car.modelo}
              onChange={handleChange}
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Color
              </Typography>
              <TextField
                required
                name="color"
                type="color"
                value={car.color}
                onChange={handleChange}
                disabled={loading}
                sx={{
                  '& input': {
                    height: 50,
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 2
                  }
                }}
              />
            </Box>

            <TextField
              required
              select
              name="nivelGasolina"
              label="Nivel de Gasolina"
              value={car.nivelGasolina}
              onChange={handleChange}
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            >
              {NIVELES_GASOLINA.map((nivel) => (
                <MenuItem key={nivel} value={nivel}>
                  {getNivelGasolinaLabel(nivel)}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ 
              mt: 3, 
              display: 'flex', 
              gap: 2,
              '& button': {
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none'
              }
            }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/cars')}
                disabled={loading}
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

export default CarForm; 