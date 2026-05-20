"use client";
// src/components/CountryDetail.js

import PropTypes from 'prop-types';
import WeatherInfo from './WeatherInfo';

export default function CountryDetail({ country, onBack }) {
  if (!country) return null;

  const {
    name,
    flags,
    capital,
    region,
    population,
    languages,
    currencies,
  } = country;

  const languageList = languages
    ? Object.values(languages).join(', ')
    : 'No disponible';

  const currencyList = currencies
    ? Object.values(currencies).map((c) => `${c.name} (${c.symbol ?? ''})`).join(', ')
    : 'No disponible';

  const formattedPopulation = population
    ? population.toLocaleString('es-ES')
    : 'No disponible';

  return (
    <div className="country-detail-container">
      {/* Botón volver */}
      <div className="py-3 px-3 px-md-4 detail-topbar d-flex align-items-center">
        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
          onClick={onBack}
          aria-label="Volver a la lista de países"
        >
          <i className="bi bi-arrow-left"></i>
          Volver a la lista
        </button>
      </div>

      <div className="container-fluid px-3 px-md-4 pb-5">
        <div className="row g-4 mt-1">

          {/* Columna izquierda: Bandera + datos principales */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="detail-flag-card card border-0 shadow-sm overflow-hidden">
              {flags?.png || flags?.svg ? (
  <img
    src={flags.png || flags.svg}
    alt={flags?.alt || `Bandera de ${name?.common}`}
    className="detail-flag img-fluid w-100"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = flags.svg || '';
      if (!flags.svg) e.target.style.display = 'none';
    }}
  />
) : (
  <div className="flag-placeholder-lg d-flex align-items-center justify-content-center bg-light">
    <i className="bi bi-image text-muted fs-1"></i>
  </div>
)}
              <div className="card-body text-center">
                <h2 className="detail-country-name mb-1">{name?.common ?? 'País'}</h2>
                {name?.official && name.official !== name.common && (
                  <p className="text-muted small mb-0">{name.official}</p>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha: Info + clima */}
          <div className="col-12 col-md-7 col-lg-8">

            {/* Información del país */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-info-circle-fill text-primary"></i>
                  Información del País
                </h5>
                <div className="row g-2">
                  <div className="col-12 col-sm-6">
                    <div className="info-item">
                      <span className="info-label">
                        <i className="bi bi-buildings me-1"></i>Capital
                      </span>
                      <span className="info-value">
                        {capital?.[0] ?? 'Sin capital registrada'}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="info-item">
                      <span className="info-label">
                        <i className="bi bi-globe me-1"></i>Región
                      </span>
                      <span className="info-value">{region ?? '—'}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="info-item">
                      <span className="info-label">
                        <i className="bi bi-people-fill me-1"></i>Población
                      </span>
                      <span className="info-value">{formattedPopulation}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="info-item">
                      <span className="info-label">
                        <i className="bi bi-translate me-1"></i>Idiomas
                      </span>
                      <span className="info-value">{languageList}</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="info-item">
                      <span className="info-label">
                        <i className="bi bi-currency-exchange me-1"></i>Moneda
                      </span>
                      <span className="info-value">{currencyList}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Información del clima */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-1 d-flex align-items-center gap-2">
                  <i className="bi bi-thermometer-sun text-warning"></i>
                  Clima Actual
                </h5>
                {capital?.[0] ? (
                  <WeatherInfo capital={capital[0]} />
                ) : (
                  <div className="alert alert-secondary mt-3 mb-0" role="alert">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    No hay capital registrada para consultar el clima.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

CountryDetail.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string,
      official: PropTypes.string,
    }),
    flags: PropTypes.shape({
      png: PropTypes.string,
      alt: PropTypes.string,
    }),
    capital: PropTypes.arrayOf(PropTypes.string),
    region: PropTypes.string,
    population: PropTypes.number,
    languages: PropTypes.object,
    currencies: PropTypes.object,
  }),
  onBack: PropTypes.func.isRequired,
};
