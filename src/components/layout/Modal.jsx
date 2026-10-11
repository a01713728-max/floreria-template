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
      className="fixed inset-0 z-50 flex cursor-pointer items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && close.current()}
    >
      <div
        role="dialog" aria-modal="true" aria-label={title}
        className={`pop modal-h relative w-full cursor-auto overflow-y-auto overscroll-contain rounded-t-2xl border border-line bg-panel pb-[env(safe-area-inset-bottom)] text-fg sm:rounded-xl ${wide ? 'max-w-4xl' : 'max-w-xl'}`}
      >
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-2 top-2 z-10 h-11 w-11 rounded-full border border-line bg-panel text-fg">✕</button>
        {children}
      </div>
    </div>
  );
}