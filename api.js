// api.js

import axios from 'axios';

const API_BASE_URL = 'https://gtfs-restapi-production.up.railway.app/';

export const getStops = async () => {
  try {
    const response = await fetch("https://gtfs-restapi-production.up.railway.app/stops");
    const stopsData = await response.json();
    return stopsData;
  } catch (error) {
    console.error(error);
  }
};
// Aquí van tus otros métodos getRoutes, etc.

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


export const getStopByRouteName = async (routeName) => {
  const response = await axios.get("https://gtfs-restapi-production.up.railway.app/stops");
  return response.data.find(stop => stop.stop_name == routeName);
};
// Obtener las paradas de una ruta de transporte público especificada por su ID
export const getStopsByRouteId = async (routeId) => {
  try {
    const response = await fetch(`https://gtfs-restapi-production.up.railway.app/stops/${routeId}`);
    const stopsData = await response.json();
    return stopsData;
  } catch (error) {
    console.error(error);
  }
};
export const getNextStopByCurrentStopId = async (currentStopId) => {
  // Asumo que los ids de las paradas están en orden. De lo contrario, tendrías que ajustar este código.
  const nextStopId = 'stop' + (parseInt(currentStopId.replace('stop', '')) + 1).toString();

  // Ahora buscamos en la base de datos o API la parada con el id 'nextStopId'.
  const response = await fetch(`${API_BASE_URL}/stops/${nextStopId}`);
  
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(`Error fetching next stop: ${response.status}`);
  }
};




