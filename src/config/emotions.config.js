/** Intenciones: fondo dinámico, copy y frases sugeridas para la dedicatoria. */
export const intents = {
  pasion: 'Pasión', admiracion: 'Admiración', ternura: 'Ternura', gratitud: 'Gratitud',
  alegria: 'Alegría', elegancia: 'Elegancia', calma: 'Calma',
};

export const emotions = {
  amor: {
    label: 'Amor', bg: '#2D0A10', dark: true, forWhom: 'Mi pareja',
    headline: 'Dile lo que sientes, sin decir una palabra.',
    sub: 'Arreglos pensados para que ella sepa exactamente cuánto la piensas.',
    transmit: ['pasion', 'admiracion', 'ternura'],
    frases: ['Contigo, cualquier día se vuelve el mejor.', 'Gracias por elegirme cada mañana.'],
  },
  mama: {
    label: 'Mamá', bg: '#FFF8F0', dark: false, forWhom: 'Mi mamá',
    headline: 'Un gracias que se queda en la mesa toda la semana.',
    sub: 'Flores cálidas y duraderas, listas para agradecer todo lo que hace.',
    transmit: ['gratitud', 'ternura', 'alegria'],
    frases: ['Todo lo bueno que soy empezó contigo.', 'Gracias por cuidarme siempre. Te quiero.'],
  },
  amigos: {
    label: 'Amigos', bg: '#0F172A', dark: true, forWhom: 'Un amigo o amiga',
    headline: 'Para quien siempre está, sin que se lo pidas.',
    sub: 'Detalles sobrios y con carácter, sin caer en lo cursi.',
    transmit: ['alegria', 'gratitud', 'elegancia'],
    frases: ['Por los que se quedan cuando todo se complica.', 'Felicidades. Nadie lo merece más que tú.'],
  },
  primeraCita: {
    label: 'Primera cita', bg: '#1A1615', dark: true, forWhom: 'Alguien que apenas conozco',
    headline: 'Impresiona con calma. Sin exagerar.',
    sub: 'Elegantes y discretos: dicen "me importas" sin pedir nada a cambio.',
    transmit: ['elegancia', 'ternura', 'calma'],
    frases: ['Me dio gusto conocerte. Espero verte pronto.', 'Algo pequeño para empezar bien.'],
  },
  casual: {
    label: 'Casual', bg: '#FAFAFA', dark: false, forWhom: 'Para mí o sin razón especial', showAll: true,
    headline: 'Flores porque sí. Las mejores razones son las simples.',
    sub: 'Toda la colección, para cuando no necesitas una ocasión.',
    transmit: ['alegria', 'calma', 'elegancia'],
    frases: ['Sin motivo. Solo porque pensé en ti.', 'Para que tu día tenga algo bonito.'],
  },
};

export const emotionOrder = ['amor', 'mama', 'amigos', 'primeraCita', 'casual'];

/** Colores de texto derivados del fondo activo. */
export const themeFor = (e) =>
  e.dark
    ? { fg: '#F6E9E4', muted: '#C4B0AA', card: 'rgba(255,255,255,0.06)', line: 'rgba(255,255,255,0.16)' }
    : { fg: '#2A1D18', muted: '#6B5A52', card: 'rgba(0,0,0,0.04)', line: 'rgba(0,0,0,0.14)' };
