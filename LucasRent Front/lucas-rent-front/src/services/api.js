import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (username, password) => {
  const token = btoa(`${username}:${password}`);
  api.defaults.headers.common['Authorization'] = `Basic ${token}`;
};

export const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password),
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    return true;
  } catch (error) {
    console.error('Error durante el login:', error);
    throw error;
  }
};

export const getCars = async () => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch('http://localhost:8080/api/coches', {
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al obtener los coches');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener los coches:', error);
    throw error;
  }
};

export const createCar = async (carData) => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch('http://localhost:8080/api/coches', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(carData)
    });

    if (!response.ok) {
      throw new Error('Error al crear el coche');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear el coche:', error);
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch(`http://localhost:8080/api/coches/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(carData)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el coche');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el coche:', error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch(`http://localhost:8080/api/coches/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el coche');
    }
  } catch (error) {
    console.error('Error al eliminar el coche:', error);
    throw error;
  }
};

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
});

export default api; 