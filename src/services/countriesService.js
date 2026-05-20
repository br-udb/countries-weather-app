// src/services/countriesService.js

const BASE_URL = 'https://restcountries.com/v3.1';

export async function getAllCountries() {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=name,flags,capital,region,population,languages,currencies,cca2`);
    if (!response.ok) {
      throw new Error(`Error al obtener países: ${response.status}`);
    }
    const data = await response.json();
    // Ordenar alfabéticamente por nombre común
    return data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  } catch (error) {
    throw new Error(error.message || 'No se pudo conectar con la API de países');
  }
}

export async function getCountryByCode(code) {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}?fields=name,flags,capital,region,population,languages,currencies,cca2`);
    if (!response.ok) {
      throw new Error(`País no encontrado: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'No se pudo obtener el detalle del país');
  }
}
