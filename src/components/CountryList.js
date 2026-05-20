"use client";
// src/components/CountryList.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CountryCard from './CountryCard';
import { getAllCountries } from '../services/countriesService';

export default function CountryList({ onSelectCountry }) {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCountries() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllCountries();
        if (!cancelled) {
          setCountries(data);
          setFiltered(data);
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

    fetchCountries();

    return () => { cancelled = true; };
  }, []);

  // Filtrar cuando cambia búsqueda o región
  useEffect(() => {
    let result = countries;

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name?.common?.toLowerCase().includes(term) ||
          c.capital?.[0]?.toLowerCase().includes(term)
      );
    }

    if (regionFilter) {
      result = result.filter((c) => c.region === regionFilter);
    }

    setFiltered(result);
  }, [search, regionFilter, countries]);

  const regions = [...new Set(countries.map((c) => c.region).filter(Boolean))].sort();

  if (loading) {
    return (
      <div className="loading-container d-flex flex-column align-items-center justify-content-center py-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-muted">Cargando países del mundo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mx-3 mt-4" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
        <div>
          <strong>Error al cargar países:</strong> {error}
          <br />
          <button
            className="btn btn-sm btn-outline-danger mt-2"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="country-list-container">
      {/* Barra de búsqueda y filtros */}
      <div className="search-bar-container py-3 px-3 sticky-top bg-white shadow-sm">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Buscar por país o capital..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Buscar países"
              />
              {search && (
                <button
                  className="btn btn-outline-secondary border-start-0"
                  onClick={() => setSearch('')}
                  aria-label="Limpiar búsqueda"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-md-3">
            <select
              className="form-select"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              aria-label="Filtrar por región"
            >
              <option value="">Todas las regiones</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-2 text-muted small text-center">
            {filtered.length} países
          </div>
        </div>
      </div>

      {/* Grid de países */}
      {filtered.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-search fs-1 d-block mb-3 opacity-25"></i>
          <p>No se encontraron países con ese criterio.</p>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => { setSearch(''); setRegionFilter(''); }}>
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 p-3">
          {filtered.map((country) => (
            <div className="col" key={country.cca2 || country.name?.common}>
              <CountryCard country={country} onSelect={onSelectCountry} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CountryList.propTypes = {
  onSelectCountry: PropTypes.func.isRequired,
};
