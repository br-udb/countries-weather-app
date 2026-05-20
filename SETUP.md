# 🌍 Countries Weather App — Setup

## 1. Crear el proyecto

```bash
npx create-next-app@latest countries-weather-app
```

Responde las preguntas así:
- TypeScript? → **No**
- ESLint? → **No**
- Tailwind CSS? → **No**
- `src/` directory? → **Yes**
- App Router? → **Yes**
- Customize import alias? → **No**

```bash
cd countries-weather-app
```

## 2. Instalar Bootstrap

```bash
npm install bootstrap
```

## 3. Crear el archivo .env.local

En la raíz del proyecto crea el archivo `.env.local`:

```
NEXT_PUBLIC_WEATHER_API_KEY=TU_API_KEY_AQUI
```

Reemplaza `TU_API_KEY_AQUI` con tu API key de OpenWeatherMap.

## 4. Copiar los archivos

Reemplaza/crea los siguientes archivos con el código proporcionado:

```
src/
├── app/
│   ├── layout.js
│   └── page.js
├── components/
│   ├── CountryCard.js
│   ├── CountryList.js
│   ├── CountryDetail.js
│   └── WeatherInfo.js
├── services/
│   ├── countriesService.js
│   └── weatherService.js
└── styles/
    └── globals.css
```

## 5. Iniciar el servidor

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
