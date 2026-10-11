import { store, formatPrice } from '../../config/store.config';
import { fire } from '../../lib/burst';


const fmtDate = (d) => new Date(`${d}T12:00`).toLocaleDateString(store.locale, { weekday: 'long', day: 'numeric', month: 'long' });

export function buildMessage({ product, delivery, dedication }) {
  const f = store.features;
  const lines = [
    `Hola ${store.name}, quiero hacer un pedido:`,
    '',
    `*Arreglo:* ${product.name} (${formatPrice(product.price)})`,
  ];
  if (f.deliveryDate && delivery.date) lines.push(`*Fecha de entrega:* ${fmtDate(delivery.date)}`);
  lines.push('', '*Datos del destinatario*', `Nombre: ${delivery.name}`);
  if (delivery.phone) lines.push(`Teléfono: ${delivery.phone}`);
  lines.push(`Dirección: ${delivery.address}`);
  if (f.cardCreator && dedication.message.trim()) {
    lines.push('', '*Dedicatoria para la tarjeta*');
    if (dedication.to) lines.push(`Para: ${dedication.to}`);
    lines.push(`"${dedication.message.trim()}"`);
    if (dedication.from) lines.push(`Con cariño, ${dedication.from}`);
  }
  return lines.join('\n');
}

export default function WhatsappCheckout({ product, delivery, dedication }) {
  const missing = [];
  if (store.features.deliveryDate && !delivery.date) missing.push('la fecha de entrega');
  if (!delivery.name.trim()) missing.push('el nombre de quien recibe');
  if (!delivery.address.trim()) missing.push('la dirección');

  if (missing.length) {
    return (
      <div>
        <button disabled className="w-full cursor-not-allowed rounded-full bg-accent px-6 py-3 font-medium text-white opacity-50">Pedir por WhatsApp</button>
        <p className="mt-2 text-sm text-muted">Falta {missing.join(', ')}.</p>
      </div>
    );
  }
  const href = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(buildMessage({ product, delivery, dedication }))}`;
  return (
    <a  href={href} target="_blank" rel="noopener noreferrer"
      onClick={(e) => fire('compra', e.currentTarget)}
      className="block w-full rounded-full bg-accent px-6 py-3 text-center font-medium text-white"
    >
      Pedir por WhatsApp
    </a>
  );
}
