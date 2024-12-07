import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box 
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
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestión de Coches
        </Typography>
        <Box>
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