import { store } from '../../config/store.config';

export default function Footer() {
  const c = store.contact;
  return (
    <footer className="mt-24 border-t border-line mood-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <section>
          <h2 className="font-display text-xl">Dónde entregamos</h2>
          <ul className="mt-3 space-y-1 text-muted">{store.coverage.map((z) => <li key={z}>{z}</li>)}</ul>
        </section>
        <section>
          <h2 className="font-display text-xl">Nuestra garantía</h2>
          <ul className="mt-3 space-y-2 text-muted">{store.guarantees.map((g) => <li key={g}>{g}</li>)}</ul>
        </section>
        <section>
          <h2 className="font-display text-xl">Hablemos</h2>
          <address className="mt-3 space-y-1 not-italic text-muted">
            <p>{c.phone}</p><p>{c.email}</p><p>{c.address}</p><p>{c.hours}</p>
          </address>
        </section>
      </div>
      <div className="border-t border-line px-5 py-6 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} {store.name}. Todos los derechos reservados.</p>
        <p className="mt-1">
          Desarrollado por{' '}
          <a href={store.developer.url} target="_blank" rel="noopener noreferrer" className="font-medium text-fg underline underline-offset-4 hover:opacity-70">
            {store.developer.name}
          </a>
        </p>
      </div>    </footer>
  );
}
