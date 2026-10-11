import { useEffect, useState } from 'react';
import { store } from '../../config/store.config';

const SHAPES = {
  heart: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />,
  star: <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1L12 2z" />,
  flower: (
    <g>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="12" cy="6.5" rx="3.2" ry="4.5" transform={`rotate(${r} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2.6" fill="#F4B400" />
    </g>
  ),
  petal: <path d="M12 2c5 4 6 10 0 20C6 12 7 6 12 2Z" />,
  bubble: <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />,
  confetti: <rect x="7" y="3" width="10" height="18" rx="1.5" />,
  dot: <circle cx="12" cy="12" r="6" />,
};

/**
 * Una entrada por intención (mismo id que en emotions.config.js) + 'compra'.
 * spread: alcance en px | fall: cuánto caen al final (negativo = siguen subiendo)
 */
const KINDS = {
  amor:        { shapes: ['heart'],  colors: ['#E63956', '#FF7A8A', '#C21F45', '#FFB3BD'], count: 18, spread: 280, fall: -40, size: [16, 28] },
  mama:        { shapes: ['flower'], colors: ['#F08A5D', '#F4B400', '#E8607F', '#F2A6B8'], count: 14, spread: 260, fall: 70,  size: [20, 32] },
  amigos:      { shapes: ['star'],   colors: ['#F4D35E', '#8FB8FF', '#FFFFFF', '#B79CFF'], count: 16, spread: 300, fall: 50,  size: [14, 24] },
  primeraCita: { shapes: ['bubble'], colors: ['#E8D2A0', '#C9A66B', '#F5E9D0'],            count: 16, spread: 200, fall: -90, size: [10, 24] },
  casual:      { shapes: ['petal'],  colors: ['#E8607F', '#F4B400', '#8FBF8F', '#F08A5D'], count: 14, spread: 260, fall: 130, size: [16, 26] },
  compra:      { shapes: ['flower', 'confetti', 'confetti', 'dot', 'petal'], colors: ['#E8607F', '#F4B400', '#F08A5D', '#8FBF8F', '#5B8DEF', '#B79CFF'], count: 64, spread: 460, fall: 220, size: [10, 26] },
};

const rnd = (a, b) => a + Math.random() * (b - a);
let uid = 0;

export default function BurstLayer() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const onBurst = (e) => {
      if (!store.features.bursts) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { kind, x, y } = e.detail;
      const k = KINDS[kind];
      if (!k) return;
      const batch = Array.from({ length: k.count }, () => {
        const angle = rnd(-Math.PI * 0.95, -Math.PI * 0.05); // abanico hacia arriba
        const dist = rnd(k.spread * 0.4, k.spread);
        return {
          id: ++uid, x, y,
          shape: k.shapes[Math.floor(Math.random() * k.shapes.length)],
          color: k.colors[Math.floor(Math.random() * k.colors.length)],
          dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist,
          rot: rnd(-360, 360), s: rnd(0.8, 1.5), size: rnd(k.size[0], k.size[1]),
          fall: k.fall, dur: rnd(1.4, 2.2), delay: rnd(0, 0.15),
        };
      });
      setItems((cur) => [...cur, ...batch]);
      setTimeout(() => setItems((cur) => cur.filter((i) => !batch.includes(i))), 2600);
    };
    window.addEventListener('floreria:burst', onBurst);
    return () => window.removeEventListener('floreria:burst', onBurst);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {items.map((i) => (
        <span
          key={i.id} className="burst-p"
          style={{
            left: i.x, top: i.y, width: i.size, height: i.size, marginLeft: -i.size / 2, marginTop: -i.size / 2,
            color: i.color, '--dx': `${i.dx}px`, '--dy': `${i.dy}px`, '--rot': `${i.rot}deg`, '--s': i.s, '--fall': `${i.fall}px`,
            animationDuration: `${i.dur}s`, animationDelay: `${i.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">{SHAPES[i.shape]}</svg>
        </span>
      ))}
    </div>
  );
}