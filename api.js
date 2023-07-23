import axios from 'axios';

const API_BASE_URL = 'https://gtfs-restapi-production.up.railway.app/';

// Obtener todas las rutas del transporte público
export const getRoutes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}routes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    return [];
  }
};
