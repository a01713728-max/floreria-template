import { emotions, themeFor } from '../../config/emotions.config';
import { store } from '../../config/store.config';

/** Envuelve la app: el fondo y los colores derivados cambian con transición suave. */
export default function MoodBackground({ emotionId, children }) {
  const e = emotions[emotionId];
  const t = themeFor(e);
  return (
    <div
      className="min-h-screen text-fg mood-t"
      style={{ backgroundColor: e.bg, '--bg': e.bg, '--fg': t.fg, '--muted': t.muted, '--card': t.card, '--line': t.line, '--accent': store.accent }}
    >
      {children}
    </div>
  );
}
