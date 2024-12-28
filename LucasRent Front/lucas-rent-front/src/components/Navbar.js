import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Box, 
  Button,
  Slide,
  useScrollTrigger
} from '@mui/material';

import { 
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Componente para manejar la animación del scroll
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({
    threshold: 100,
    target: window,
    disableHysteresis: false,
    hysteresisThreshold: 20
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar({ darkMode, setDarkMode, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const buttonStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '28px',
    px: 3,
    fontWeight: 500,
    transition: 'all 0.3s ease',
    textTransform: 'none',
    letterSpacing: '0.5px',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: (theme) =>
        theme.palette.mode === 'dark'
          ? 'linear-gradient(120deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
          : 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))',
      borderRadius: 'inherit',
      transform: 'translateX(-100%)',
      transition: 'transform 0.4s ease',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: (theme) =>
        theme.palette.mode === 'dark'
          ? '0 4px 12px rgba(0,0,0,0.3)'
          : '0 4px 12px rgba(37, 99, 235, 0.2)',
      '&::after': {
        transform: 'translateX(0)',
      }
    },
    '&.active': {
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(4px)',
      boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1)',
      '&::after': {
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))'
            : 'linear-gradient(120deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
        transform: 'translateX(0)',
      }
    }
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        sx={{ 
          top: 0,
          margin: 0,
          padding: 0,
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' 
              ? 'rgba(26, 32, 53, 0.95)' 
              : 'rgba(37, 99, 235, 0.95)',
          backdropFilter: 'blur(8px)',
          boxShadow: (theme) => 
            theme.palette.mode === 'dark'
              ? '0 4px 30px rgba(0, 0, 0, 0.2)'
              : '0 4px 30px rgba(37, 99, 235, 0.2)',
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.05)'
              : '1px solid rgba(37, 99, 235, 0.1)',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'center', 
          py: 1,
          minHeight: '68px'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              onClick={() => navigate('/cars')} 
              color="inherit"
              sx={buttonStyle}
              className={location.pathname === '/cars' ? 'active' : ''}
            >
              Gasolina
            </Button>
            <Button 
              onClick={() => navigate('/bookings')} 
              color="inherit"
              sx={buttonStyle}
              className={location.pathname === '/bookings' ? 'active' : ''}
            >
              Reservas
            </Button>
          </Box>

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
    </HideOnScroll>
  );
}

export default Navbar; 