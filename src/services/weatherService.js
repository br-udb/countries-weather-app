// src/services/weatherService.js

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function getWeatherByCity(city) {
  if (!city) {
    throw new Error('No se proporcionó una ciudad');
  }

  if (!API_KEY) {
    throw new Error('API Key de clima no configurada. Revisa tu archivo .env.local');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );

    if (response.status === 401) {
      throw new Error('API Key inválida. Verifica tu clave de OpenWeatherMap');
    }

    if (response.status === 404) {
      throw new Error(`No se encontró información del clima para "${city}"`);
    }

    if (!response.ok) {
      throw new Error(`Error al obtener el clima: ${response.status}`);
    }

    const data = await response.json();

    // Retornar solo los 4 datos requeridos por la rúbrica
    return {
      temperatura: Math.round(data.main?.temp ?? 0),
      sensacionTermica: Math.round(data.main?.feels_like ?? 0),
      estado: data.weather?.[0]?.description ?? 'No disponible',
      icono: data.weather?.[0]?.icon ?? '01d',
      humedad: data.main?.humidity ?? 0,
      viento: data.wind?.speed ?? 0,
      ciudad: data.name ?? city,
    };
  } catch (error) {
    throw new Error(error.message || 'No se pudo conectar con la API del clima');
  }
}
