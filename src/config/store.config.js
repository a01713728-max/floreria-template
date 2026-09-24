/**
 * PANEL DE CAMBIOS RÁPIDOS
 * Para un cliente nuevo normalmente solo tocas este archivo (+ products.js).
 */
export const store = {
  name: 'Maison Pétalo',
  tagline: 'Flores que dicen lo que tú no sabes cómo decir',
  banner: 'Entrega el mismo día en Querétaro si pides antes de las 2 pm',
  whatsapp: '524421234567', // código de país + número, sin + ni espacios
  currency: 'MXN',
  locale: 'es-MX',

  accent: '#B03F5A', // color primario de acento (botones, badges, foco)

  fontStyle: 'serif', // 'serif' | 'sans'
  fonts: {
    serif: {
      display: "'Fraunces', Georgia, serif",
      body: "'Instrument Sans', system-ui, sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Instrument+Sans:wght@400;500;600&display=swap',
    },
    sans: {
      display: "'Bricolage Grotesque', system-ui, sans-serif",
      body: "'Instrument Sans', system-ui, sans-serif",
      url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Instrument+Sans:wght@400;500;600&display=swap',
    },
  },

  features: {
    wizard: true,
    cardCreator: true,
    deliveryDate: true,
    fab: true,          // círculo flotante de WhatsApp
    seal: true,         // sello giratorio del hero
    trustStrip: true,   // cinta de garantías con iconos
    howItWorks: true,   // diagrama "cómo pedir"
    bursts: true, // corazones, flores y confeti
  },

  coverage: ['Querétaro centro', 'El Refugio', 'Juriquilla', 'Corregidora', 'El Marqués'],
  guarantees: [
    'Si no llega fresca, la reponemos sin costo.',
    'Foto del arreglo antes de salir de taller.',
    'Tu dedicatoria se imprime en tarjeta física.',
  ],
  contact: { phone: '442 123 4567', email: 'hola@maisonpetalo.mx', address: 'Av. Universidad 100, Querétaro', hours: 'Lun a Sáb, 9:00 a 19:00' },
  developer: { name: 'VizNet', url: 'https://viznet-landing-page.vercel.app/' },

   trust: [
    { icon: 'flower', text: 'Flores frescas cada mañana' },
    { icon: 'truck', text: 'Entrega el mismo día' },
    { icon: 'card', text: 'Tarjeta impresa a mano' },
    { icon: 'shield', text: 'Garantía de frescura' },
    { icon: 'clock', text: 'Pedidos hasta las 2 pm' },
    { icon: 'whatsapp', text: 'Foto antes de enviar' },
  ],
  seal: 'Frescura garantizada · Entrega el mismo día · ',
};

export const formatPrice = (n) =>
  new Intl.NumberFormat(store.locale, { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(n);
