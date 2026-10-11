import { store } from '../config/store.config';
export function loadFonts() {
  const f = store.fonts[store.fontStyle];
  if (!document.querySelector(`link[href="${f.url}"]`)) {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = f.url; document.head.appendChild(l);
  }
  document.documentElement.style.setProperty('--font-display', f.display);
  document.documentElement.style.setProperty('--font-body', f.body);
}
