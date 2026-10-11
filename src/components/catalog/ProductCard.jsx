import { formatPrice } from '../../config/store.config';

/** Imagen del producto, o un ramo abstracto generado con su paleta si no hay foto. */
export function ProductVisual({ product }) {
  if (product.image) return <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />;
  const [a, b, c] = product.palette;
  const dot = (x, y, r, col) => `radial-gradient(circle at ${x}% ${y}%, ${col} 0 ${r}%, transparent ${r + 1}%)`;
  return (
    <div
      role="img" aria-label={product.name} className="h-full w-full"
      style={{ background: [dot(30, 35, 22, a), dot(64, 28, 17, b), dot(46, 62, 25, a), dot(76, 68, 15, b), dot(24, 76, 12, b), c].join(',') }}
    />
  );
}

export default function ProductCard({ product, onSelect }) {
  return (
    <article>
      <button onClick={() => onSelect(product)} className="group block w-full text-left">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md">
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-105"><ProductVisual product={product} /></div>
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.map((b) => <span key={b} className="rounded-full bg-accent px-3 py-1 text-xs text-white">{b}</span>)}
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight">{product.name}</h3>
          <span className="shrink-0 text-muted">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-1 max-w-[42ch] text-sm leading-relaxed text-muted">{product.porQueLeEncantara}</p>
        <p className="mt-2 text-sm font-medium underline underline-offset-4">Ver sin dudas</p>
      </button>
    </article>
  );
}
