import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton, Box } from '@mui/material';
import { getHotels } from '../services/api'; // Asegúrate de tener esta función en tu API
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'; // Asegúrate de importar los íconos
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate

function Hoteles() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Asegúrate de tener useNavigate

  const loadHotels = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getHotels(); // Llama a la API para obtener los hoteles
      setHotels(data);
    } catch (error) {
      console.error('Error al cargar los hoteles:', error);
      setError('Error al cargar los hoteles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este hotel?')) {
      try {
        // Lógica para eliminar el hotel
        // await deleteHotel(id); // Asegúrate de tener esta función en tu API
        loadHotels();
      } catch (error) {
        console.error('Error al eliminar el hotel:', error);
      }
    }
  };
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/hotels/new')}
          sx={addButtonStyle}
        >
          Nuevo Hotel
        </Button>
      </Box>

      {loading && <p>Cargando hoteles...</p>}
      {error && <Typography color="error">{error}</Typography>}
      {hotels.length > 0 ? (
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
                  padding: '8px 4px', // Ajusta el padding para que sea más pequeño
                  '&:first-of-type': {
                    borderTopLeftRadius: '8px',
                    paddingLeft: '8px', // Ajusta el padding
                  },
                  '&:last-child': {
                    borderTopRightRadius: '8px',
                    paddingRight: '8px', // Ajusta el padding
                  }
                }
              }}>
                <TableCell sx={{ width: '30%' }}>Nombre</TableCell>
                <TableCell sx={{ width: '40%' }}>Dirección</TableCell>
                <TableCell sx={{ width: '30%' }}>Teléfono</TableCell>
                <TableCell sx={{ width: '10%' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotels.map((hotel) => (
                <TableRow 
                  key={hotel.id}
                  sx={{ 
                    transition: 'all 0.2s ease',
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
                      padding: '8px 4px', // Ajusta el padding para que sea más pequeño
                      fontSize: '0.9rem', // Ajusta el tamaño de la fuente
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '&:first-of-type': {
                        paddingLeft: '8px', // Ajusta el padding
                      },
                      '&:last-child': {
                        paddingRight: '8px', // Ajusta el padding
                      }
                    }
                  }}
                >
                  <TableCell>{hotel.name}</TableCell>
                  <TableCell>{hotel.address}</TableCell>
                  <TableCell>{hotel.hotelphone}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => navigate(`/hotels/edit/${hotel.id}`)}
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
                      onClick={() => handleDelete(hotel.id)}
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
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        !loading && <Typography>No hay hoteles disponibles.</Typography>
      )}
    </Box>
  );
}

export default Hoteles; 