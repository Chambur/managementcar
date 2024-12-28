import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';

// Importaciones de componentes
import Login from './components/Login';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import Navbar from './components/Navbar';
import BookingList from './components/BookingList';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') ? true : false;
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 0
        }}>
          <Box 
            sx={{
              height: '200px',
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #1a237e, #311b92, #4a148c)' 
                : 'linear-gradient(45deg, #42a5f5, #2196f3, #1976d2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                animation: 'rotate 15s linear infinite',
              },
              '@keyframes rotate': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                }
              }
            }}
          />
          {isAuthenticated && (
            <Navbar 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
              setIsAuthenticated={setIsAuthenticated} 
            />
          )}
        </Box>

        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/cars" />
              )
            } 
          />
          <Route 
            path="/cars" 
            element={
              isAuthenticated ? (
                <CarList />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/cars/new" 
            element={
              isAuthenticated ? (
                <CarForm />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/cars/edit/:id" 
            element={
              isAuthenticated ? (
                <CarForm />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          <Route 
            path="/" 
            element={<Navigate to="/cars" />} 
          />
          <Route
            path="/bookings"
            element={isAuthenticated ? <BookingList /> : <Navigate to="/login" />}
            />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 
