"use client";
// src/app/page.js

import { useState } from 'react';
import CountryList from '../components/CountryList';
import CountryDetail from '../components/CountryDetail';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleSelectCountry(country) {
    setSelectedCountry(country);
    // Scroll al inicio al seleccionar un país
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBack() {
    setSelectedCountry(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="container-fluid px-3 px-md-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-globe-americas fs-4"></i>
            <span className="app-title">WorldWeather</span>
          </div>
          {selectedCountry && (
            <span className="breadcrumb-text text-truncate">
              <i className="bi bi-chevron-right mx-1 opacity-50"></i>
              {selectedCountry.name?.common}
            </span>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <main className="app-main">
        {selectedCountry ? (
          <CountryDetail
            country={selectedCountry}
            onBack={handleBack}
          />
        ) : (
          <>
            <div className="hero-section px-3 px-md-4 py-4">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="hero-video"
  >
    <source src="https://videos.pexels.com/video-files/1851190/1851190-hd_1920_1080_25fps.mp4" type="video/mp4" />
  </video>
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <h1 className="hero-title">Explora el Mundo</h1>
    <p className="hero-subtitle text-muted">
      Selecciona un país para ver su información detallada y el clima actual de su capital.
    </p>
  </div>
</div>
            <CountryList onSelectCountry={handleSelectCountry} />
          </>
        )}
      </main>
    </div>
  );
}
