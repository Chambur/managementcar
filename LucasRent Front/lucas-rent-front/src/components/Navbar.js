import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Box, 
  Button 
} from '@mui/material';

import { 
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
      {/* Contenedor central para los botones */}
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button onClick={() => navigate('/cars')} color="inherit">Gasolina</Button>
      <Button onClick={() => navigate('/bookings')} color="inherit">Reservas</Button>
    </Box>

    {/* Contenedor para los íconos (a la derecha) */}
    <Box sx={{ position: 'absolute', right: 16, display: 'flex', alignItems: 'center' }}>
      <IconButton 
        color="inherit" 
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <LightIcon /> : <DarkIcon />}
      </IconButton>
      <IconButton 
        color="inherit"
        onClick={handleLogout}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  </Toolbar>
</AppBar>
  );
}

export default Navbar; 