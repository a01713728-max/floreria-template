import { useEffect, useRef } from 'react';
import { store } from '../../config/store.config';
import { Icon } from './Icons';

const LEN = 488; // circunferencia útil del círculo (2π·78 con un pequeño margen)

export default function RotatingSeal() {
  const ref = useRef(null);

  useEffect(() => {
    const fit = () => {
      const t = ref.current;
      if (!t) return;
      t.setAttribute('letter-spacing', '0');
      const len = t.getComputedTextLength();
      if (len > 0) t.setAttribute('letter-spacing', String(Math.max(0, (LEN - len) / store.seal.length)));
    };
    fit();
    document.fonts?.ready.then(fit); // vuelve a medir cuando carga la tipografía
  }, []);

  return (
    <div className="relative h-36 w-36 text-fg" role="img" aria-label={store.seal.replace(/·/g, ',')}>
      <svg viewBox="0 0 200 200" className="seal-spin absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text ref={ref} fontSize="15" fill="currentColor" style={{ fontFamily: 'var(--font-body)' }}>
          <textPath href="#seal-circle" xlinkHref="#seal-circle">{store.seal}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
        <Icon.flower width={30} height={30} />
      </div>
    </div>
  );
}