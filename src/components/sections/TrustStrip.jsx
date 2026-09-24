import { store } from '../../config/store.config';
import { Icon } from '../ui/Icons';

export default function TrustStrip() {
  const items = [...store.trust, ...store.trust];
  return (
    <div className="marquee mt-6 overflow-hidden border-y border-line py-4 mood-t" aria-label="Por qué confiar en nosotros">
      <ul className="marquee-track">
        {items.map((t, i) => {
          const I = Icon[t.icon];
          return (
            <li key={i} aria-hidden={i >= store.trust.length} className="flex shrink-0 items-center gap-3 pr-12 text-muted">
              <span className="text-fg"><I width={22} height={22} /></span>
              <span className="whitespace-nowrap text-sm">{t.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}