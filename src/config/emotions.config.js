// Una entrada por intención. Los ids deben coincidir con arreglos.emociones en la base.
export const intents = {
  pasion: 'Pasión', ternura: 'Ternura', admiracion: 'Admiración', gratitud: 'Gratitud',
  alegria: 'Alegría', elegancia: 'Elegancia', calma: 'Calma',
};
export const emotions = {
  amor: { label: 'Amor', forWhom: 'Para mi pareja', bg: '#2A0A14', dark: true, transmit: ['pasion', 'ternura', 'admiracion'],
    headline: 'Que no quede duda de lo que sientes', sub: 'Arreglos para decir lo que a veces cuesta decir en voz alta.',
    frases: ['Contigo todo es mejor.', 'Gracias por quedarte.', 'Sigo eligiéndote cada día.'] },
  mama: { label: 'Mamá', forWhom: 'Para mi mamá', bg: '#FFF1E6', transmit: ['gratitud', 'ternura', 'alegria'],
    headline: 'Un gracias que ella va a presumir', sub: 'Flores resistentes y de colores cálidos para que luzcan toda la semana.',
    frases: ['Gracias por todo, mamá.', 'Eres mi lugar seguro.', 'Te quiero más de lo que digo.'] },
  amigos: { label: 'Amigos', forWhom: 'Para un amigo o amiga', bg: '#1B2147', dark: true, transmit: ['alegria', 'gratitud', 'admiracion'],
    headline: 'Un buen detalle para quien siempre está', sub: 'Para cumpleaños, logros o simplemente porque sí.',
    frases: ['Qué suerte tenerte.', 'Felicidades, te lo mereces.', 'Gracias por estar siempre.'] },
  primeraCita: { label: 'Primera cita', forWhom: 'Para una primera cita', bg: '#F7EEDD', transmit: ['ternura', 'elegancia', 'alegria'],
    headline: 'Interés sin presión', sub: 'Arreglos pequeños y bonitos que se pueden llevar a casa sin compromiso.',
    frases: ['Me dio gusto conocerte.', 'Una probadita de primavera.', 'Para empezar bien.'] },
  casual: { label: 'Todas', forWhom: 'Para otra ocasión', bg: '#F6F3EC', showAll: true, transmit: ['alegria', 'calma', 'elegancia', 'gratitud'],
    headline: 'Flores para cualquier día', sub: 'Elige por ocasión o deja que el orientador te recomiende tres opciones.',
    frases: ['Porque sí.', 'Para que sonrías hoy.', 'Pensé en ti.'] },
};
export const emotionOrder = ['amor', 'mama', 'amigos', 'primeraCita', 'casual'];

export function themeFor(e) {
  return e.dark
    ? { fg: '#F8EFEA', muted: '#C9B8BC', card: 'rgba(255,255,255,.07)', line: 'rgba(255,255,255,.18)' }
    : { fg: '#2B1B1F', muted: '#6B585C', card: 'rgba(0,0,0,.04)', line: 'rgba(0,0,0,.14)' };
}
