import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Frame } from './Shell';
import { supabase } from '../lib/supabase';
import { rolDe } from '../lib/auth';

const input = 'mt-1 w-full rounded-md border border-line bg-card px-3 py-2 text-base';

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('');
    const { data, error } = await supabase.auth.signInWithPassword(f);
    if (error) { setErr('Correo o contraseña incorrectos.'); setBusy(false); return; }
    const rol = await rolDe(data.user.id);
    nav(rol === 'admin' ? '/admin' : rol === 'empleado' ? '/equipo' : '/');
  };

  return (
    <Frame>
      <div className="mx-auto max-w-sm px-5 py-20">
        <h1 className="font-display text-3xl">Entrar al panel</h1>
        {!supabase ? (
          <p className="mt-4 text-muted">Aún no hay base de datos conectada. Revisa el <Link to="/admin" className="underline">panel en modo demo</Link>.</p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm">Correo<input type="email" required autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={input} /></label>
            <label className="block text-sm">Contraseña<input type="password" required autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} className={input} /></label>
            {err && <p role="alert" className="text-sm">{err}</p>}
            <button disabled={busy} className="w-full rounded-full bg-accent px-6 py-3 font-medium text-white disabled:opacity-50">{busy ? 'Entrando…' : 'Entrar'}</button>
          </form>
        )}
      </div>
    </Frame>
  );
}
