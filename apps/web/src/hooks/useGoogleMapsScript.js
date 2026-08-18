// Carga el script de Google Maps JavaScript API (con la librería "places")
// una sola vez, sin importar cuántos componentes usen este hook a la vez.
// Evita duplicar <script> tags y expone el estado de carga.

import { useEffect, useState } from 'react';

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-js-api';

// Estado compartido entre todos los componentes que usan el hook, para no
// disparar múltiples cargas del script en paralelo.
let loadingPromise = null;

function loadGoogleMapsScript(apiKey) {
  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=es&region=CO`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => {
      loadingPromise = null;
      reject(err);
    };
    document.head.appendChild(script);
  });

  return loadingPromise;
}

/**
 * @returns {{ isLoaded: boolean, loadError: Error|null }}
 */
export function useGoogleMapsScript() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [isLoaded, setIsLoaded] = useState(!!window.google?.maps?.places);
  const [loadError, setLoadError] = useState(
    apiKey ? null : new Error('Falta VITE_GOOGLE_MAPS_API_KEY en el .env')
  );

  useEffect(() => {
    if (!apiKey || isLoaded) return;

    let cancelled = false;
    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!cancelled) setIsLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoadError(new Error('No se pudo cargar Google Maps.'));
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, isLoaded]);

  return { isLoaded, loadError };
}
