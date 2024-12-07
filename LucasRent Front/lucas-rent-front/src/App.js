import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';

// Importaciones de componentes
import Login from './components/Login';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import Navbar from './components/Navbar';

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
        {isAuthenticated && (
          <Navbar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            setIsAuthenticated={setIsAuthenticated} 
          />
        )}
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 
