import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createHotel, updateHotel, getHotels } from '../services/api';

function HotelForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    hotelphone: '',
  });

  useEffect(() => {
    if (id) {
      loadHotel();
    }
  }, [id]);

  const loadHotel = async () => {
    try {
      const hotels = await getHotels();
      const hotelToEdit = hotels.find(h => h.id === parseInt(id));
      if (hotelToEdit) {
        setHotel(hotelToEdit);
      } else {
        setError('Hotel no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar el hotel:', error);
      setError('Error al cargar el hotel');
    }
  };

  const handleChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await updateHotel(id, hotel);
      } else {
        await createHotel(hotel);
      }
      navigate('/hotels');
    } catch (error) {
      console.error('Error al guardar el hotel:', error);
      setError(error.message || 'Error al procesar la solicitud. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
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
            {id ? 'Editar Hotel' : 'Nuevo Hotel'}
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
              name="name"
              label="Nombre del Hotel"
              value={hotel.name}
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
              name="address"
              label="Dirección"
              value={hotel.address}
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
              name="hotelphone"
              label="Teléfono"
              value={hotel.hotelphone}
              onChange={handleChange}
              type="tel"
              fullWidth
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />

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
                onClick={() => navigate('/hotels')}
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

export default HotelForm; 