import { store } from '../../config/store.config';
import { emotions, emotionOrder } from '../../config/emotions.config';

export default function Header({ emotionId, onSelect, onWizard }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line mood-t" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 90%, transparent)', backdropFilter: 'blur(10px)' }}>
      <p className="bg-accent px-4 py-2 text-center text-sm text-white">{store.banner}</p>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        <a href="/" className="font-display text-2xl font-semibold tracking-tight">{store.name}</a>
        <nav aria-label="¿Para qué ocasión?" className="order-3 -mx-5 flex w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 pb-1 md:order-none md:mx-0 md:w-auto md:px-0 md:pb-0">
          {emotionOrder.map((id) => (
            <button
              key={id} onClick={() => onSelect(id)} aria-pressed={emotionId === id}
              className={`mood-t shrink-0 rounded-full border px-4 py-1.5 text-sm ${emotionId === id ? 'border-accent bg-accent text-white' : 'border-line text-fg hover:bg-card'}`}
            >
              {emotions[id].label}
            </button>
          ))}
        </nav>
        {store.features.wizard && (
         <button
            onClick={(ev) => onSelect(id, ev.currentTarget)}
            className="rounded-full border border-line px-4 py-1.5 text-sm font-medium hover:bg-card"
          >
            Ayúdame a elegir
        </button>
        )}
      </div>
    </header>
  );
}
