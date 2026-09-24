import { useEffect } from 'react';
import { emotions, themeFor } from '../../config/emotions.config';
import { store } from '../../config/store.config';

/** Envuelve la app: el fondo y los colores derivados cambian con transición suave. */
export default function MoodBackground({ emotionId, children }) {
  const e = emotions[emotionId];
  const t = themeFor(e);

  // Pinta el fondo del <html> (rebote de iOS) y la barra del navegador móvil
  useEffect(() => {
    document.documentElement.style.backgroundColor = e.bg;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = e.bg;
  }, [e.bg]);

  return (
    <div
      className="min-app text-fg mood-t"
      style={{
        backgroundColor: e.bg,
        colorScheme: e.dark ? 'dark' : 'light', // el selector de fecha nativo se ve bien en fondos oscuros
        '--bg': e.bg, '--fg': t.fg, '--muted': t.muted, '--card': t.card, '--line': t.line, '--accent': store.accent,
      }}
    >
      {children}
    </div>
  );
}