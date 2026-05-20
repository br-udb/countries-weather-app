"use client";
// src/components/WeatherInfo.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getWeatherByCity } from '../services/weatherService';

export default function WeatherInfo({ capital }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      if (!capital) {
        setError('Este país no tiene capital registrada.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setWeather(null);
        const data = await getWeatherByCity(capital);
        if (!cancelled) {
          setWeather(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => { cancelled = true; };
  }, [capital]);

  if (loading) {
    return (
      <div className="weather-loading d-flex align-items-center gap-2 p-3">
        <div className="spinner-border spinner-border-sm text-info" role="status">
          <span className="visually-hidden">Cargando clima...</span>
        </div>
        <span className="text-muted small">Consultando clima de {capital}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning d-flex align-items-start gap-2 mt-3" role="alert">
        <i className="bi bi-cloud-slash-fill mt-1"></i>
        <div>
          <strong>Clima no disponible:</strong><br />
          <span className="small">{error}</span>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="weather-card mt-3">
      <div className="weather-header d-flex align-items-center gap-2 mb-3">
        <i className="bi bi-cloud-sun-fill fs-4 text-warning"></i>
        <h5 className="mb-0 fw-bold">Clima en {weather.ciudad}</h5>
      </div>

      <div className="row g-3">
        {/* Temperatura */}
        <div className="col-6 col-md-3">
          <div className="weather-stat-card text-center p-3">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icono}@2x.png`}
              alt={weather.estado}
              className="weather-icon"
            />
            <div className="weather-temp">{weather.temperatura}°C</div>
            <div className="weather-label">Temperatura</div>
          </div>
        </div>

        {/* Estado del clima */}
        <div className="col-6 col-md-3">
          <div className="weather-stat-card text-center p-3 h-100 d-flex flex-column align-items-center justify-content-center">
            <i className="bi bi-cloud-fill fs-2 text-secondary mb-2"></i>
            <div className="weather-value text-capitalize">{weather.estado}</div>
            <div className="weather-label">Estado</div>
          </div>
        </div>

        {/* Humedad */}
        <div className="col-6 col-md-3">
          <div className="weather-stat-card text-center p-3 h-100 d-flex flex-column align-items-center justify-content-center">
            <i className="bi bi-droplet-fill fs-2 text-info mb-2"></i>
            <div className="weather-value">{weather.humedad}%</div>
            <div className="weather-label">Humedad</div>
          </div>
        </div>

        {/* Viento */}
        <div className="col-6 col-md-3">
          <div className="weather-stat-card text-center p-3 h-100 d-flex flex-column align-items-center justify-content-center">
            <i className="bi bi-wind fs-2 text-success mb-2"></i>
            <div className="weather-value">{weather.viento} m/s</div>
            <div className="weather-label">Viento</div>
          </div>
        </div>
      </div>

      <p className="text-muted small mt-2 mb-0">
        <i className="bi bi-thermometer-half me-1"></i>
        Sensación térmica: {weather.sensacionTermica}°C
      </p>
    </div>
  );
}

WeatherInfo.propTypes = {
  capital: PropTypes.string,
};

WeatherInfo.defaultProps = {
  capital: null,
};
