import { useEffect, useMemo, useState } from 'react';
import Shell from './Shell';
import { listOrders, setEstado } from '../lib/api';

const NEXT = { por_armar: 'armado', armado: 'en_ruta', en_ruta: 'entregado' };
const LABEL = { por_armar: 'Por armar', armado: 'Armado', en_ruta: 'En ruta', entregado: 'Entregado' };
const today = () => new Date().toISOString().slice(0, 10);

export default function Equipo() {
  const [orders, setOrders] = useState(null);
  const [day, setDay] = useState(today());
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(null);

  useEffect(() => { listOrders().then(setOrders).catch((e) => setErr(e.message)); }, []);
  const list = useMemo(() => (orders || []).filter((o) => o.fecha === day), [orders, day]);
  const resumen = useMemo(() => {
    const m = {};
    list.filter((o) => o.estado === 'por_armar').forEach((o) => o.items.forEach((i) => { m[i.nombre] = (m[i.nombre] || 0) + i.cantidad; }));
    return Object.entries(m);
  }, [list]);

  const avanzar = async (o) => {
    setBusy(o.id); setErr('');
    try { await setEstado(o.id, NEXT[o.estado]); setOrders((cur) => cur.map((x) => (x.id === o.id ? { ...x, estado: NEXT[o.estado] } : x))); }
    catch (e) { setErr('No se pudo actualizar el pedido: ' + e.message); }
    setBusy(null);
  };

  return (
    <Shell title="Pedidos del día" roles={['empleado', 'admin']}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="text-sm">Fecha de entrega<input type="date" value={day} onChange={(e) => setDay(e.target.value)} className="mt-1 block rounded-md border border-line bg-card px-3 py-2" /></label>
        <p className="text-muted">{list.length} {list.length === 1 ? 'pedido' : 'pedidos'} · {list.filter((o) => o.estado === 'entregado').length} entregados</p>
      </div>
      {err && <p role="alert" className="mt-4">{err}</p>}
      {resumen.length > 0 && (
        <section className="mt-6 rounded-lg border border-line p-5">
          <h2 className="font-display text-xl">Por armar</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">{resumen.map(([n, c]) => <li key={n} className="rounded-full bg-card px-3 py-1">{c} × {n}</li>)}</ul>
        </section>
      )}
      {!orders ? <p className="mt-6 text-muted">Cargando pedidos…</p> : !list.length ? <p className="mt-6 text-muted">No hay pedidos para esta fecha.</p> : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {list.map((o) => (
            <li key={o.id} className="rounded-lg border border-line p-5">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-display text-xl">{o.destinatario}</h3><p className="text-sm text-muted">{o.items.map((i) => `${i.cantidad} × ${i.nombre}`).join(', ')}</p></div>
                <span className="shrink-0 rounded-full bg-card px-3 py-1 text-sm">{LABEL[o.estado] || o.estado}</span>
              </div>
              {o.pago !== 'pagado' && <p className="mt-3 text-sm font-medium">Pago pendiente: confirma antes de armar.</p>}
              <p className="mt-3 text-sm">{o.direccion}{o.referencia && <span className="text-muted"> · {o.referencia}</span>}</p>
              {o.mensaje && <p className="mt-3 rounded-md bg-card p-3 text-sm italic">“{o.mensaje}”</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.direccion)}`} className="rounded-full border border-line px-4 py-2 text-sm">Abrir mapa</a>
                {NEXT[o.estado] && <button disabled={busy === o.id} onClick={() => avanzar(o)} className="rounded-full bg-accent px-4 py-2 text-sm text-white disabled:opacity-50">Marcar como {LABEL[NEXT[o.estado]].toLowerCase()}</button>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
