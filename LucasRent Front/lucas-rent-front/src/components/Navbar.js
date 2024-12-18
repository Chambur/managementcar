import { 
  AppBar, 
  Toolbar, 
  Typography, 
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
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestión
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left' }}>
          <Button onClick={() => navigate('/cars')} color="inherit">Gasolina</Button>
          <Button onClick={() => navigate('/reservas')} color="inherit">Reservas</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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