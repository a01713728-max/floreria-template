import { useState } from 'react';
import { hasDB, crearPedido } from '../../lib/api';
import { store } from '../../config/store.config';

// Solo aparece cuando hay base de datos conectada. Crea el pedido en el servidor y abre el pago.
export default function PayButton({ product, emotionId, delivery, dedication }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  if (!hasDB || !store.features.onlinePayment) return null;
  const ok = delivery.date && delivery.name.trim() && delivery.address.trim();

  const pay = async () => {
    setBusy(true); setErr('');
    try { window.location.href = await crearPedido({ arreglo_id: product.id, emocion: emotionId, delivery, card: dedication }); }
    catch (e) { setErr(e.message || 'No pudimos iniciar el pago. Intenta de nuevo o pide por WhatsApp.'); setBusy(false); }
  };

  return (
    <div>
      <button disabled={!ok || busy} onClick={pay} className="press w-full rounded-full bg-fg px-6 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-50" style={{ color: 'var(--bg)' }}>
        {busy ? 'Abriendo el pago…' : 'Pagar en línea'}
      </button>
      {err && <p role="alert" className="mt-2 text-sm text-muted">{err}</p>}
    </div>
  );
}
