import { Icon } from '../ui/Icons';
import Reveal from '../ui/Reveal';

const steps = [
  { icon: 'flower', title: 'Elige', text: 'Filtra por ocasión o deja que el orientador te recomiende 3 opciones.' },
  { icon: 'pen', title: 'Dedica', text: 'Escribe tu mensaje y míralo en la tarjeta antes de pedir.' },
  { icon: 'whatsapp', title: 'Confirma', text: 'Te llega el pedido armado a WhatsApp. Solo lo envías.' },
  { icon: 'truck', title: 'Recibe', text: 'Entregamos en la fecha que elegiste, con foto previa.' },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-5" aria-labelledby="como-pedir">
      <h2 id="como-pedir" className="font-display text-3xl">Pedir toma cuatro pasos</h2>
      <p className="mt-1 text-muted">Sin registro ni carrito. Tú decides y nosotros nos encargamos del resto.</p>

      <div className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
        <svg className="absolute left-[12.5%] top-[27px] hidden h-1 w-3/4 text-accent md:block" aria-hidden="true">
          <line x1="0" y1="2" x2="100%" y2="2" stroke="currentColor" strokeWidth="2" className="flow-line" />
        </svg>
        {steps.map((s, i) => {
          const I = Icon[s.icon];
          return (
            <Reveal key={s.title} delay={i * 120}>
              <div className="group flex gap-4 md:flex-col md:items-center md:text-center">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-panel transition duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <I />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p className="mt-1 max-w-[30ch] text-sm leading-relaxed text-muted md:mx-auto">{s.text}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}