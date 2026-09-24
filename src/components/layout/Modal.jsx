import { useEffect, useRef } from 'react';

export default function Modal({ title, onClose, wide = false, children }) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close.current();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && close.current()}
    >
      <div
        role="dialog" aria-modal="true" aria-label={title}
        className={`pop relative max-h-[94vh] w-full overflow-y-auto rounded-t-2xl border border-line bg-panel text-fg sm:rounded-xl ${wide ? 'max-w-4xl' : 'max-w-xl'}`}
      >
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full border border-line bg-panel text-fg">✕</button>
        {children}
      </div>
    </div>
  );
}
