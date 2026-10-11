// Todo lo editable de la tienda vive aquí.
export const store = {
  name: 'Florería',
  tagline: 'Flores con mensaje, sin dudas',
  accent: '#C2385A',
  whatsapp: '5210000000000', // lada país + número, sin + ni espacios
  locale: 'es-MX',
  banner: 'Entregas el mismo día en pedidos antes de las 2 pm',
  seal: 'HECHO A MANO · ENTREGA CON FOTO · ',
  fontStyle: 'editorial',
  fonts: {
    editorial: {
      url: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:wght@400;500&display=swap',
      display: "'Fraunces', Georgia, serif",
      body: "'DM Sans', system-ui, sans-serif",
    },
  },
  features: { seal: true, wizard: true, trustStrip: true, howItWorks: true, fab: true, bursts: true, deliveryDate: true, cardCreator: true, onlinePayment: true },
  trust: [
    { icon: 'truck', text: 'Entrega el mismo día' },
    { icon: 'shield', text: 'Garantía de frescura' },
    { icon: 'pen', text: 'Dedicatoria impresa incluida' },
    { icon: 'clock', text: 'Foto antes de entregar' },
    { icon: 'card', text: 'Pago seguro en línea' },
  ],
  coverage: ['Centro', 'Juriquilla', 'El Refugio', 'Milenio III'],
  guarantees: ['Si no llega fresca, la reponemos.', 'Te mandamos foto antes de entregar.', 'Cambio de fecha sin costo con 24 h de aviso.'],
  contact: { phone: '+52 000 000 0000', email: 'hola@floreria.mx', address: 'Querétaro, Qro.', hours: 'Lun a Sáb, 9:00 a 19:00' },
  developer: { name: 'Tu equipo', url: 'https://github.com/a01713728-max/floreria-template' },
};

const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
export const formatPrice = (n) => money.format(n);
