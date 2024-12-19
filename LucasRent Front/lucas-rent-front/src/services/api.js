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

export const getBookings = async () => {
  const auth = localStorage.getItem('auth');
  try {
    //console.log("Entrando al GET");
    const response = await fetch(`http://localhost:8080/api/booking`, {
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reservas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  const auth = localStorage.getItem('auth');
  try {
    //console.log("Entrando al POST");
    //console.log('Enviando datos de la reserva al backend:', JSON.stringify(bookingData, null, 2));

    const response = await fetch(`${API_URL}/api/booking`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      throw new Error('Error al crear la reserva');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw error;
  }
};

export const updateBooking = async (id, bookingData) => {
  const auth = localStorage.getItem('auth');
  try {
    console.log('Actualizando reserva con datos:', JSON.stringify(bookingData, null, 2));

    const response = await fetch(`${API_URL}/api/booking/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la reserva');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch(`${API_URL}/api/booking/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la reserva');
    }
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
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