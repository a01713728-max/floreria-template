// Catálogo de respaldo (modo demo). Con Supabase configurado, el catálogo sale de la tabla `arreglos`.
const P = (id, name, price, palette, emotions, tags, badges, contiene, durabilidad, porQueLeEncantara, nivelDeImpacto, porQueRegalarlo) =>
  ({ id, name, price, image: '', palette, emotions, tags, badges, contiene, durabilidad, porQueLeEncantara, nivelDeImpacto, porQueRegalarlo });

export const seedProducts = [
  P('borgona', 'Ramo Borgoña', 1290, ['#7A1027', '#B23A4E', '#2D0A10'], ['amor'], ['pasion', 'admiracion'], ['Más pedido'],
    '24 rosas rojas de tallo largo, follaje de eucalipto', '7-10 días', 'Es el clásico que nunca falla, pero con un acabado editorial que no se ve genérico.', 'Garantía de sonrisa', 'Cuando quieres que no quede duda de lo que sientes.'),
  P('peonia', 'Peonía Silenciosa', 1490, ['#F2C6CF', '#E9A3B4', '#FFF1EE'], ['amor', 'primeraCita'], ['ternura', 'elegancia'], ['De temporada'],
    '9 peonías, ranúnculos y hojas de olivo', '5-7 días', 'Ideal si le gusta lo elegante sin verse cargado.', 'Sorpresa memorable', 'La peonía se asocia con cariño genuino, no con compromiso.'),
  P('jardin-mama', 'Jardín de Mamá', 890, ['#F6B08A', '#F3D27A', '#FFF3E4'], ['mama'], ['gratitud', 'ternura'], ['Favorito de mamás'],
    'Rosas durazno, alstroemerias, margaritas', '8-12 días', 'Colores cálidos y flores resistentes: luce en la sala toda la semana.', 'Abrazo garantizado', 'Es un gracias visible que ella va a mostrar a las visitas.'),
  P('girasoles', 'Girasoles al Sol', 690, ['#F4B400', '#D98E04', '#FFF6CC'], ['amigos', 'casual', 'mama'], ['alegria', 'gratitud'], ['Entrega hoy'],
    '7 girasoles con follaje verde', '6-8 días', 'Alegra el cuarto de inmediato y no exige explicación.', 'Buen humor asegurado', 'Sirve para cumpleaños, ánimo o simplemente para decir gracias.'),
  P('lino', 'Lino Blanco', 950, ['#FFFFFF', '#E8E4DA', '#C9D3B8'], ['primeraCita', 'casual'], ['elegancia', 'calma'], [],
    'Lisianthus blanco, gypsophila y eucalipto', '7-10 días', 'Se ve caro y tranquilo. Encaja en cualquier casa.', 'Buen gusto sin esfuerzo', 'Nadie lo puede malinterpretar: es amable y limpio.'),
  P('indigo', 'Noche Índigo', 1150, ['#26356B', '#5B6FB8', '#0F172A'], ['amigos', 'amor'], ['elegancia', 'admiracion'], ['Edición limitada'],
    'Delphinium azul, lisianthus morado, eucalipto plateado', '6-9 días', 'Es diferente a lo típico y transmite carácter.', 'Efecto "qué buen detalle"', 'Para quien valora lo distinto por encima de lo predecible.'),
  P('primer-encuentro', 'Primer Encuentro', 590, ['#F7D9C4', '#E7B7A0', '#FBEFE4'], ['primeraCita'], ['ternura', 'alegria'], ['Sin presión'],
    '5 rosas crema y verde silvestre en frasco', '5-7 días', 'Es pequeño y bonito: lo puede llevar a casa sin sentirse comprometida.', 'Primera impresión limpia', 'Muestra interés sin abrumar.'),
  P('tulipanes', 'Tulipanes de Domingo', 780, ['#F58FA8', '#FFC2D1', '#FFF0F3'], ['mama', 'casual', 'amigos'], ['alegria', 'calma'], [],
    '15 tulipanes mixtos en papel kraft', '5-7 días', 'Se abren poco a poco durante la semana y cambian de forma.', 'Detalle fresco y ligero', 'Un regalo que no compromete ni pesa.'),
];

/** Devuelve hasta `limit` productos ordenados por coincidencia con la intención. */
export function recommend(products, emotion, emotionId, tag, limit = 3) {
  const pool = emotion.showAll ? products : products.filter((p) => p.emotions.includes(emotionId));
  return [...pool].sort((a, b) => Number(b.tags.includes(tag)) - Number(a.tags.includes(tag))).slice(0, limit);
}
