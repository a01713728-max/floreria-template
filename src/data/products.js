/**
 * Catálogo con metadatos "Cero Dudas".
 * emotions: en qué intenciones aparece | tags: qué transmite (ver intents)
 * image: URL o ruta en /public. Si está vacío se genera un degradado con palette.
 */
export const products = [
  {
    id: 'borgona', name: 'Ramo Borgoña', price: 1290, image: '', palette: ['#7A1027', '#B23A4E', '#2D0A10'],
    emotions: ['amor'], tags: ['pasion', 'admiracion'], badges: ['Más pedido'],
    contiene: '24 rosas rojas de tallo largo, follaje de eucalipto', durabilidad: '7-10 días',
    porQueLeEncantara: 'Es el clásico que nunca falla, pero con un acabado editorial que no se ve genérico.',
    nivelDeImpacto: 'Garantía de sonrisa',
    porQueRegalarlo: 'Cuando quieres que no quede duda de lo que sientes.',
  },
  {
    id: 'peonia', name: 'Peonía Silenciosa', price: 1490, image: '', palette: ['#F2C6CF', '#E9A3B4', '#FFF1EE'],
    emotions: ['amor', 'primeraCita'], tags: ['ternura', 'elegancia'], badges: ['De temporada'],
    contiene: '9 peonías, ranúnculos y hojas de olivo', durabilidad: '5-7 días',
    porQueLeEncantara: 'Ideal si le gusta lo elegante sin verse cargado.',
    nivelDeImpacto: 'Sorpresa memorable',
    porQueRegalarlo: 'La peonía se asocia con cariño genuino, no con compromiso.',
  },
  {
    id: 'jardin-mama', name: 'Jardín de Mamá', price: 890, image: '', palette: ['#F6B08A', '#F3D27A', '#FFF3E4'],
    emotions: ['mama'], tags: ['gratitud', 'ternura'], badges: ['Favorito de mamás'],
    contiene: 'Rosas durazno, alstroemerias, margaritas', durabilidad: '8-12 días',
    porQueLeEncantara: 'Colores cálidos y flores resistentes: luce en la sala toda la semana.',
    nivelDeImpacto: 'Abrazo garantizado',
    porQueRegalarlo: 'Es un gracias visible que ella va a mostrar a las visitas.',
  },
  {
    id: 'girasoles', name: 'Girasoles al Sol', price: 690, image: '', palette: ['#F4B400', '#D98E04', '#FFF6CC'],
    emotions: ['amigos', 'casual', 'mama'], tags: ['alegria', 'gratitud'], badges: ['Entrega hoy'],
    contiene: '7 girasoles con follaje verde', durabilidad: '6-8 días',
    porQueLeEncantara: 'Alegra el cuarto de inmediato y no exige explicación.',
    nivelDeImpacto: 'Buen humor asegurado',
    porQueRegalarlo: 'Sirve para cumpleaños, ánimo o simplemente para decir gracias.',
  },
  {
    id: 'lino', name: 'Lino Blanco', price: 950, image: '', palette: ['#FFFFFF', '#E8E4DA', '#C9D3B8'],
    emotions: ['primeraCita', 'casual'], tags: ['elegancia', 'calma'], badges: [],
    contiene: 'Lisianthus blanco, gypsophila y eucalipto', durabilidad: '7-10 días',
    porQueLeEncantara: 'Se ve caro y tranquilo. Encaja en cualquier casa.',
    nivelDeImpacto: 'Buen gusto sin esfuerzo',
    porQueRegalarlo: 'Nadie lo puede malinterpretar: es amable y limpio.',
  },
  {
    id: 'indigo', name: 'Noche Índigo', price: 1150, image: '', palette: ['#26356B', '#5B6FB8', '#0F172A'],
    emotions: ['amigos', 'amor'], tags: ['elegancia', 'admiracion'], badges: ['Edición limitada'],
    contiene: 'Delphinium azul, lisianthus morado, eucalipto plateado', durabilidad: '6-9 días',
    porQueLeEncantara: 'Es diferente a lo típico y transmite carácter.',
    nivelDeImpacto: 'Efecto "qué buen detalle"',
    porQueRegalarlo: 'Para quien valora lo distinto por encima de lo predecible.',
  },
  {
    id: 'primer-encuentro', name: 'Primer Encuentro', price: 590, image: '', palette: ['#F7D9C4', '#E7B7A0', '#FBEFE4'],
    emotions: ['primeraCita'], tags: ['ternura', 'alegria'], badges: ['Sin presión'],
    contiene: '5 rosas crema y verde silvestre en frasco', durabilidad: '5-7 días',
    porQueLeEncantara: 'Es pequeño y bonito: lo puede llevar a casa sin sentirse comprometida.',
    nivelDeImpacto: 'Primera impresión limpia',
    porQueRegalarlo: 'Muestra interés sin abrumar.',
  },
  {
    id: 'tulipanes', name: 'Tulipanes de Domingo', price: 780, image: '', palette: ['#F58FA8', '#FFC2D1', '#FFF0F3'],
    emotions: ['mama', 'casual', 'amigos'], tags: ['alegria', 'calma'], badges: [],
    contiene: '15 tulipanes mixtos en papel kraft', durabilidad: '5-7 días',
    porQueLeEncantara: 'Se abren poco a poco durante la semana y cambian de forma.',
    nivelDeImpacto: 'Detalle fresco y ligero',
    porQueRegalarlo: 'Un regalo que no compromete ni pesa.',
  },
];

/** Devuelve hasta `limit` productos ordenados por coincidencia con la intención. */
export function recommend(emotion, emotionId, tag, limit = 3) {
  const pool = emotion.showAll ? products : products.filter((p) => p.emotions.includes(emotionId));
  return [...pool]
    .sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag)))
    .slice(0, limit);
}
