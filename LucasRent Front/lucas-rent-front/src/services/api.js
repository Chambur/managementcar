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
export const getBookingsmonth = async (year, month) => {
  const auth = localStorage.getItem('auth');
  try {
    //console.log("Entrando al GET");
    const response = await fetch(`http://localhost:8080/api/booking/month/${year}/${month}`, {
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      let errorMessage = 'Error al obtener las reservas';

      try {
        const errorData = await response.json(); // Intentar obtener el cuerpo del error
        errorMessage = errorData.message || errorMessage; // Usar el mensaje del backend si existe
      } catch (e) {
        console.error('No se pudo leer el cuerpo de la respuesta de error:', e);
      }
      throw new Error(errorMessage); // Lanzar el error con el mensaje adecuado
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener las reservas:', error.message);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  const auth = localStorage.getItem('auth');

  try {
    const response = await fetch(`${API_URL}/api/booking`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(bookingData),
    });

    // Si la respuesta no es exitosa, intentamos extraer el mensaje del backend
    if (!response.ok) {
      let errorMessage = 'Error al crear la reserva';

      try {
        const errorData = await response.json(); // Intentar obtener el cuerpo del error
        errorMessage = errorData.message || errorMessage; // Usar el mensaje del backend si existe
      } catch (e) {
        console.error('No se pudo leer el cuerpo de la respuesta de error:', e);
      }
      throw new Error(errorMessage); // Lanzar el error con el mensaje adecuado
    }
    // Si todo va bien, devolvemos los datos de la reserva creada
    return await response.json();
  } catch (error) {
    console.error('Error al crear la reserva:', error.message);
    throw error; // Propagar el error para manejarlo en el nivel superior
  }
};


export const updateBooking = async (id, bookingData) => {
  const auth = localStorage.getItem('auth');
  try {
    //console.log('Actualizando reserva con datos:', JSON.stringify(bookingData, null, 2));

    const response = await fetch(`${API_URL}/api/booking/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(bookingData)
    });

    // Si la respuesta no es exitosa, intentamos extraer el mensaje del backend
    if (!response.ok) {
      let errorMessage = 'Error al crear la reserva';

      try {
        const errorData = await response.json(); // Intentar obtener el cuerpo del error
        errorMessage = errorData.message || errorMessage; // Usar el mensaje del backend si existe
      } catch (e) {
        console.error('No se pudo leer el cuerpo de la respuesta de error:', e);
      }
      throw new Error(errorMessage); // Lanzar el error con el mensaje adecuado
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


export const getHotels = async () => {
  const auth = localStorage.getItem('auth');
  try {
    //console.log("Entrando al GET");
    const response = await fetch(`http://localhost:8080/api/hotels`, {
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    // Si la respuesta no es exitosa, intentamos extraer el mensaje del backend
    if (!response.ok) {
      let errorMessage = 'Error al crear la reserva';

      try {
        const errorData = await response.json(); // Intentar obtener el cuerpo del error
        errorMessage = errorData.message || errorMessage; // Usar el mensaje del backend si existe
      } catch (e) {
        console.error('No se pudo leer el cuerpo de la respuesta de error:', e);
      }
      throw new Error(errorMessage); // Lanzar el error con el mensaje adecuado
    }

    return await response.json();

  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    throw error;
  }
};

export const createHotel = async (hotelData) => {
  const auth = localStorage.getItem('auth');
  try {
    //console.log("Entrando al POST");
    console.log('Enviando datos de la reserva al backend:', JSON.stringify(hotelData, null, 2));

    const response = await fetch(`${API_URL}/api/hotels`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(hotelData)
    });

    // Si la respuesta no es exitosa, intentamos extraer el mensaje del backend
    if (!response.ok) {
      let errorMessage = 'Error al crear la reserva';

      try {
        const errorData = await response.json(); // Intentar obtener el cuerpo del error
        errorMessage = errorData.message || errorMessage; // Usar el mensaje del backend si existe
      } catch (e) {
        console.error('No se pudo leer el cuerpo de la respuesta de error:', e);
      }
      throw new Error(errorMessage); // Lanzar el error con el mensaje adecuado
    }

    return await response.json();

  } catch (error) {
    console.error('Error al crear el hotel:', error);
    throw error;
  }
};

export const updateHotel = async (id, hotelData) => {
  const auth = localStorage.getItem('auth');
  try {
    //console.log('Actualizando reserva con datos:', JSON.stringify(bookingData, null, 2));

    const response = await fetch(`${API_URL}/api/hotels/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(hotelData)
    });

    // Si la respuesta no es exitosa, intentamos extraer el mensaje del backend
    if (!response.ok) {
      let errorMessage = 'Error al crear la reserva';

      try {
        const errorData = await response.json(); // Intentar obtener el cuerpo del error
        errorMessage = errorData.message || errorMessage; // Usar el mensaje del backend si existe
      } catch (e) {
        console.error('No se pudo leer el cuerpo de la respuesta de error:', e);
      }
      throw new Error(errorMessage); // Lanzar el error con el mensaje adecuado
    }

    return await response.json();
    
  } catch (error) {
    console.error('Error al actualizar el hotel:', error);
    throw error;
  }
};

export const deleteHotel = async (id) => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch(`${API_URL}/api/hotels/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el hotel');
    }
  } catch (error) {
    console.error('Error al eliminar el hotel:', error);
    throw error;
  }
};

// Obtener reservas del día actual
export const getTodayBookings = async () => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch(`${API_URL}/api/booking/today`, {
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al obtener las reservas del día');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener las reservas del día:', error);
    throw error;
  }
};

// Actualizar estado de reserva del coche
export const updateCarReservationStatus = async (carId, isReserved) => {
  const auth = localStorage.getItem('auth');
  try {
    const response = await fetch(`${API_URL}/api/coches/${carId}/reservado?reservado=${isReserved}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el estado del coche');
    }

    // Solo intentamos parsear como JSON si hay contenido
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    
    // Si no hay contenido JSON, simplemente retornamos true para indicar éxito
    return true;
  } catch (error) {
    console.error('Error al actualizar el estado del coche:', error);
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

