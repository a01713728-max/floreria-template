import { useState } from 'react';
import Modal from '../layout/Modal';
import { ProductVisual } from '../catalog/ProductCard';
import { emotions, emotionOrder, intents } from '../../config/emotions.config';
import { recommend } from '../../data/products';
import { formatPrice } from '../../config/store.config';

const opt = 'mood-t w-full rounded-lg border border-line px-5 py-4 text-left text-lg hover:border-accent hover:bg-card';

export default function EmotionalWizard({ onClose, onEmotion, onPick }) {
  const [step, setStep] = useState(1);
  const [who, setWho] = useState(null);
  const [tag, setTag] = useState(null);
  const e = who && emotions[who];
  const results = step === 3 ? recommend(e, who, tag, 3) : [];

  return (
    <Modal title="Orientador floral" onClose={onClose}>
      <div className="p-6 pt-14 sm:p-8 sm:pt-12">
        <p className="text-sm text-muted">Paso {step} de 3</p>

        {step === 1 && (
          <>
            <h2 className="mt-2 font-display text-3xl">¿Para quién es?</h2>
            <div className="mt-6 space-y-3">
              {emotionOrder.map((id) => (
                <button key={id} className={opt} onClick={() => { setWho(id); onEmotion(id); setStep(2); }}>{emotions[id].forWhom}</button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mt-2 font-display text-3xl">¿Qué quieres transmitir?</h2>
            <div className="mt-6 space-y-3">
              {e.transmit.map((t) => (
                <button key={t} className={opt} onClick={() => { setTag(t); setStep(3); }}>{intents[t]}</button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-5 text-sm text-muted underline">Cambiar destinatario</button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="mt-2 font-display text-3xl">Estas son tus mejores opciones</h2>
            <p className="mt-1 text-muted">Elegimos {results.length} para no abrumarte.</p>
            <ul className="mt-6 space-y-4">
              {results.map((p, i) => (
                <li key={p.id} className="flex gap-4 rounded-lg border border-line p-3 mood-t">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md"><ProductVisual product={p} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg">{p.name} <span className="font-body text-sm text-muted">{formatPrice(p.price)}</span></p>
                    {i === 0 && <p className="text-sm font-medium underline">Nuestra recomendación</p>}
                    <p className="mt-1 text-sm text-muted">{p.porQueLeEncantara}</p>
                    <button onClick={() => onPick(p)} className="mt-2 rounded-full bg-accent px-4 py-1.5 text-sm text-white">Elegir este</button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => { setStep(1); setTag(null); }} className="mt-5 text-sm text-muted underline">Empezar de nuevo</button>
          </>
        )}
      </div>
    </Modal>
  );
}
