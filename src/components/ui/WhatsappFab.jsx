import { store } from '../../config/store.config';
import { Icon } from './Icons';

export default function WhatsappFab() {
  const text = `Hola ${store.name}, quiero ayuda para elegir unas flores.`;
  const href = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed z-40 flex items-center gap-3"
    style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))', right: 'calc(1.25rem + env(safe-area-inset-right))' }}
    >
      <span className="pointer-events-none translate-x-2 rounded-full bg-panel px-4 py-2 text-sm text-fg opacity-0 shadow-lg ring-1 ring-line transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        ¿Te ayudamos a elegir?
      </span>

      <span
        className="press relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl"
        style={{ background: '#1DA851' }}
      >
        <span
          className="fab-ring absolute inset-0 rounded-full"
          style={{ background: '#1DA851' }}
        />

        <Icon.whatsapp
          className="relative"
          width={30}
          height={30}
        />
      </span>
    </a>
  );
}