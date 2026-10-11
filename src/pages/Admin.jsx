import { useEffect, useMemo, useState } from 'react';
import Shell from './Shell';
import { listOrders, listFlores } from '../lib/api';
import { formatPrice } from '../config/store.config';
import { emotions } from '../config/emotions.config';

const iso = (d) => d.toISOString().slice(0, 10);
const Stat = ({ label, value }) => (
  <div className="rounded-lg border border-line p-4"><p className="text-sm text-muted">{label}</p><p className="mt-1 font-display text-3xl">{value}</p></div>
);
const Card = ({ title, children }) => (
  <section className="rounded-lg border border-line p-5"><h2 className="font-display text-xl">{title}</h2><div className="mt-4">{children}</div></section>
);
const ESTADO = { por_armar: 'Por armar', armado: 'Armado', en_ruta: 'En ruta', entregado: 'Entregado' };

export default function Admin() {
  const [orders, setOrders] = useState(null);
  const [flores, setFlores] = useState([]);
  const [err, setErr] = useState('');
  const [range, setRange] = useState(14);

  useEffect(() => {
    Promise.all([listOrders(), listFlores()]).then(([o, f]) => { setOrders(o); setFlores(f); }).catch((e) => setErr(e.message));
  }, []);

  const v = useMemo(() => {
    if (!orders) return null;
    const from = new Date(); from.setDate(from.getDate() - range + 1);
    const inR = orders.filter((o) => o.fecha >= iso(from));
    const paid = inR.filter((o) => o.pago === 'pagado');
    const sales = paid.reduce((s, o) => s + o.total, 0);
    const byDay = Array.from({ length: range }, (_, i) => {
      const d = new Date(from); d.setDate(d.getDate() + i); const k = iso(d);
      return { k, v: paid.filter((o) => o.fecha === k).reduce((s, o) => s + o.total, 0) };
    });
    const top = {}, emo = {};
    paid.forEach((o) => {
      emo[o.emocion || 'sin dato'] = (emo[o.emocion || 'sin dato'] || 0) + o.total;
      o.items.forEach((i) => { const t = (top[i.nombre] ||= { n: 0, r: 0 }); t.n += i.cantidad; t.r += i.cantidad * i.precio; });
    });
    return {
      inR, sales, count: paid.length, ticket: paid.length ? sales / paid.length : 0, pend: inR.filter((o) => o.pago !== 'pagado').length, byDay,
      top: Object.entries(top).sort((a, b) => b[1].r - a[1].r).slice(0, 5), emo: Object.entries(emo).sort((a, b) => b[1] - a[1]),
    };
  }, [orders, range]);

  const max = v ? Math.max(1, ...v.byDay.map((d) => d.v)) : 1;
  const low = flores.filter((f) => f.stock <= 20);

  return (
    <Shell title="Panel de administración" roles={['admin']}>
      {err && <p role="alert" className="mb-4">No pudimos cargar los datos: {err}</p>}
      {!v ? <p className="text-muted">Cargando datos…</p> : (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-muted">Ventas pagadas por fecha de entrega.</p>
            <label className="text-sm">Periodo{' '}
              <select value={range} onChange={(e) => setRange(+e.target.value)} className="rounded-md border border-line bg-card px-2 py-1">
                <option value={7}>7 días</option><option value={14}>14 días</option><option value={30}>30 días</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Ventas" value={formatPrice(v.sales)} />
            <Stat label="Pedidos pagados" value={v.count} />
            <Stat label="Ticket promedio" value={formatPrice(v.ticket)} />
            <Stat label="Pagos pendientes" value={v.pend} />
          </div>
          <Card title="Ventas por día">
            <div className="flex h-40 items-end gap-1" role="img" aria-label="Gráfica de ventas por día">
              {v.byDay.map((d) => <div key={d.k} title={`${d.k}: ${formatPrice(d.v)}`} className="flex-1 rounded-t bg-accent" style={{ height: `${Math.max(2, (d.v / max) * 100)}%`, opacity: d.v ? 1 : 0.2 }} />)}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted"><span>{v.byDay[0].k}</span><span>{v.byDay.at(-1).k}</span></div>
          </Card>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Arreglos más vendidos">
              <table className="w-full text-sm"><thead><tr className="text-left text-muted"><th className="pb-2 font-normal">Arreglo</th><th className="pb-2 text-right font-normal">Piezas</th><th className="pb-2 text-right font-normal">Ingresos</th></tr></thead>
                <tbody>{v.top.map(([n, t]) => <tr key={n} className="border-t border-line"><td className="py-2">{n}</td><td className="text-right">{t.n}</td><td className="text-right">{formatPrice(t.r)}</td></tr>)}</tbody></table>
            </Card>
            <Card title="Ventas por intención">
              <ul className="space-y-3">{v.emo.map(([k, val]) => (
                <li key={k} className="text-sm"><div className="flex justify-between"><span>{emotions[k]?.label || k}</span><span className="text-muted">{formatPrice(val)}</span></div>
                  <div className="mt-1 h-2 rounded-full bg-card"><div className="h-2 rounded-full bg-accent" style={{ width: `${(val / v.emo[0][1]) * 100}%` }} /></div></li>
              ))}</ul>
            </Card>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Stock bajo">
              {low.length ? <ul className="space-y-2 text-sm">{low.map((f) => <li key={f.nombre} className="flex justify-between border-t border-line pt-2"><span>{f.nombre} <span className="text-muted">({f.proveedor || 'sin proveedor'})</span></span><strong>{f.stock}</strong></li>)}</ul> : <p className="text-sm text-muted">Todo el inventario está por encima de 20 piezas.</p>}
            </Card>
            <Card title="Últimos pedidos">
              <ul className="space-y-2 text-sm">{v.inR.slice(0, 8).map((o) => (
                <li key={o.id} className="flex justify-between gap-3 border-t border-line pt-2"><span>{o.destinatario} · {o.fecha}</span><span className="text-muted">{ESTADO[o.estado] || o.estado} · {o.pago === 'pagado' ? formatPrice(o.total) : 'sin pagar'}</span></li>
              ))}</ul>
            </Card>
          </div>
        </div>
      )}
    </Shell>
  );
}
