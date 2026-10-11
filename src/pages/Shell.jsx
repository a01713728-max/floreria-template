import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSession } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { store } from '../config/store.config';
import { loadFonts } from '../lib/fonts';

const vars = { '--bg': '#F6F3EC', '--fg': '#2B1B1F', '--muted': '#6B585C', '--card': 'rgba(0,0,0,.04)', '--line': 'rgba(0,0,0,.14)', '--accent': store.accent };

export function Frame({ children }) {
  useEffect(loadFonts, []);
  return <div className="min-app bg-panel font-body text-fg" style={vars}>{children}</div>;
}

// Protege la página por rol. Sin Supabase configurado entra en modo demo.
export default function Shell({ title, roles, children }) {
  const { loading, session, rol, demo } = useSession();
  const nav = useNavigate();
  if (loading) return <Frame><p className="p-8 text-muted">Cargando…</p></Frame>;
  if (!demo && !session) return <Navigate to="/login" replace />;
  if (!roles.includes(rol)) return <Frame><div className="mx-auto max-w-md p-8"><h1 className="font-display text-2xl">Sin acceso</h1><p className="mt-2 text-muted">Tu cuenta no tiene permiso para ver esta sección.</p><Link to="/" className="mt-4 inline-block underline">Volver a la tienda</Link></div></Frame>;
  return (
    <Frame>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-4"><Link to="/" className="font-display text-xl">{store.name}</Link><h1 className="text-muted">{title}</h1></div>
          <div className="flex items-center gap-3 text-sm">
            {demo && <span className="rounded-full bg-card px-3 py-1">Modo demo: datos de ejemplo</span>}
            {rol === 'admin' && <><Link to="/admin" className="underline">Admin</Link><Link to="/equipo" className="underline">Equipo</Link></>}
            {!demo && <button onClick={async () => { await supabase.auth.signOut(); nav('/login'); }} className="rounded-full border border-line px-3 py-1">Salir</button>}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </Frame>
  );
}
