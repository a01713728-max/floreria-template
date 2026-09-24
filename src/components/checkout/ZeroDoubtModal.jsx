import { useState } from 'react';
import Modal from '../layout/Modal';
import { ProductVisual } from '../catalog/ProductCard';
import WhatsappCheckout from './WhatsappCheckout';
import { store, formatPrice } from '../../config/store.config';
import { emotions } from '../../config/emotions.config';

const input = 'mt-1 w-full rounded-md border border-line bg-card px-3 py-2 text-fg mood-t placeholder:text-muted';
const MAX = 180;

function Field({ label, children }) {
  return <label className="block text-sm">{label}{children}</label>;
}

export default function ZeroDoubtModal({ product, emotionId, onClose }) {
  const [delivery, setDelivery] = useState({ date: '', name: '', phone: '', address: '' });
  const [card, setCard] = useState({ to: '', message: '', from: '' });
  const setD = (k) => (e) => setDelivery({ ...delivery, [k]: e.target.value });
  const setC = (k) => (e) => setCard({ ...card, [k]: e.target.value });
  const today = new Date().toISOString().slice(0, 10);
  const frases = emotions[emotionId].frases;
  const facts = [
    ['Cuánto dura', product.durabilidad],
    ['Por qué le encantará', product.porQueLeEncantara],
    ['Nivel de impacto', product.nivelDeImpacto],
    ['Por qué regalarlo', product.porQueRegalarlo],
  ];

  return (
    <Modal title={product.name} onClose={onClose} wide>
      <div className="grid md:grid-cols-2">
        <section className="p-6 pt-14 sm:p-8 md:pt-8">
          <div className="aspect-[4/3] overflow-hidden rounded-md"><ProductVisual product={product} /></div>
          <h2 className="mt-5 font-display text-3xl">{product.name}</h2>
          <p className="text-lg text-muted">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-muted">Incluye {product.contiene}.</p>
          <dl className="mt-6 space-y-4">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-line pt-3">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="mt-0.5 max-w-[46ch]">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-5 border-line p-6 sm:p-8 md:border-l">
          <h3 className="font-display text-2xl">Tu pedido</h3>
          {store.features.deliveryDate && (
            <Field label="Fecha de entrega"><input type="date" min={today} value={delivery.date} onChange={setD('date')} className={input} /></Field>
          )}
          <Field label="Nombre de quien recibe"><input value={delivery.name} onChange={setD('name')} className={input} placeholder="Ana Martínez" /></Field>
          <Field label="Teléfono de contacto (opcional)"><input type="tel" value={delivery.phone} onChange={setD('phone')} className={input} /></Field>
          <Field label="Dirección de entrega"><textarea rows={2} value={delivery.address} onChange={setD('address')} className={input} placeholder="Calle, número, colonia y referencias" /></Field>

          {store.features.cardCreator && (
            <div className="border-t border-line pt-5">
              <h3 className="font-display text-2xl">Tu dedicatoria</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {frases.map((f) => (
                  <button key={f} onClick={() => setCard({ ...card, message: f })} className="rounded-full border border-line px-3 py-1 text-left text-sm hover:bg-card">{f}</button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field label="Para"><input value={card.to} onChange={setC('to')} className={input} /></Field>
                <Field label="De parte de"><input value={card.from} onChange={setC('from')} className={input} /></Field>
              </div>
              <Field label={`Mensaje (${card.message.length}/${MAX})`}>
                <textarea rows={3} maxLength={MAX} value={card.message} onChange={setC('message')} className={input} />
              </Field>
              <p className="mt-4 text-sm text-muted">Así se verá en la tarjeta impresa:</p>
              <div className="mt-2 -rotate-1 rounded-sm p-3 shadow-xl" style={{ background: '#FBF6EE', color: '#3A2A24' }}>
                <div className="min-h-[9rem] rounded-sm border border-dashed p-5 text-center font-display italic" style={{ borderColor: '#CBB8A6' }}>
                  {card.to && <p className="text-sm not-italic opacity-70">Para {card.to}</p>}
                  <p className="mt-2 text-lg leading-relaxed">{card.message || 'Tu mensaje aparecerá aquí.'}</p>
                  {card.from && <p className="mt-3 text-sm">Con cariño, {card.from}</p>}
                </div>
              </div>
            </div>
          )}

          <WhatsappCheckout product={product} delivery={delivery} dedication={card} />
        </section>
      </div>
    </Modal>
  );
}
