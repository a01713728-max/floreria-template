/** fire('amor', elemento) lanza partículas desde ese elemento (o desde el centro si no se pasa). */
export function fire(kind, origin) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight * 0.4;
  if (origin?.getBoundingClientRect) {
    const r = origin.getBoundingClientRect();
    x = r.left + r.width / 2;
    y = r.top + r.height / 2;
  }
  window.dispatchEvent(new CustomEvent('floreria:burst', { detail: { kind, x, y } }));
}