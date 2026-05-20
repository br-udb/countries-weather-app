// src/app/layout.js

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

export const metadata = {
  title: 'WorldWeather — Países y Clima',
  description: 'Consulta información de países y el clima actual de sus capitales',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Bootstrap Icons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
