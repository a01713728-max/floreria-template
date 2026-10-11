// Lanza una explosión de partículas desde un elemento (o desde el centro de la pantalla).
export function fire(kind, origin) {
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  if (origin?.getBoundingClientRect) {
    const r = origin.getBoundingClientRect();
    x = r.left + r.width / 2; y = r.top + r.height / 2;
  }
  window.dispatchEvent(new CustomEvent('floreria:burst', { detail: { kind, x, y } }));
}
