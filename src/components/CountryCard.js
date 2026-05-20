"use client";
// src/components/CountryCard.js

import PropTypes from 'prop-types';

export default function CountryCard({ country, onSelect }) {
  const { name, flags, capital, region } = country;

  return (
    <div
      className="country-card card h-100 shadow-sm"
      onClick={() => onSelect(country)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(country)}
      aria-label={`Ver detalles de ${name?.common}`}
    >
      <div className="flag-container">
        {flags?.png || flags?.svg ? (
  <img
    src={flags.png || flags.svg}
    alt={flags?.alt || `Bandera de ${name?.common}`}
    className="country-flag card-img-top"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = flags.svg || '';
      if (!flags.svg) e.target.style.display = 'none';
    }}
  />
) : (
  <div className="flag-placeholder d-flex align-items-center justify-content-center">
    <span className="text-muted">Sin bandera</span>
  </div>
)}
      </div>
      <div className="card-body">
        <h6 className="card-title fw-bold text-truncate">{name?.common ?? 'País desconocido'}</h6>
        <p className="card-text small text-muted mb-1">
          <i className="bi bi-geo-alt-fill me-1"></i>
          {capital?.[0] ?? 'Sin capital'}
        </p>
        <p className="card-text small text-muted">
          <i className="bi bi-globe me-1"></i>
          {region ?? 'Sin región'}
        </p>
      </div>
      <div className="card-footer bg-transparent border-0 pb-3">
        <span className="badge region-badge">{region ?? '—'}</span>
      </div>
    </div>
  );
}

CountryCard.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string,
    }),
    flags: PropTypes.shape({
      png: PropTypes.string,
      alt: PropTypes.string,
    }),
    capital: PropTypes.arrayOf(PropTypes.string),
    region: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
