import ProductCard from './ProductCard';
import { products } from '../../data/products';
import { emotions } from '../../config/emotions.config';

export default function ProductGrid({ emotionId, onSelect }) {
  const e = emotions[emotionId];
  const list = e.showAll ? products : products.filter((p) => p.emotions.includes(emotionId));
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-5 pt-8" aria-live="polite">
      <h2 className="font-display text-3xl">{e.showAll ? 'Toda la colección' : `Para ${e.label.toLowerCase()}`}</h2>
      <p className="mt-1 text-muted">{list.length} {list.length === 1 ? 'arreglo' : 'arreglos'}, todos con la información que necesitas para decidir.</p>
      <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.id} product={p} onSelect={onSelect} />)}
      </div>
    </section>
  );
}
