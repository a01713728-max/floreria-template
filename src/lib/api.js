import { supabase } from './supabase';
import { demoOrders, demoFlores } from './demo';

export const hasDB = !!supabase;

const flat = (r) => ({
  id: r.id, destinatario: r.nombre_destinatario,
  direccion: [r.calle, r.numero, r.ciudad].filter(Boolean).join(', '), referencia: r.referencia || '',
  mensaje: r.incluye_mensaje ? r.mensaje || '' : '', fecha: r.fecha_envio, estado: r.estado, pago: r.estado_pago,
  total: Number(r.total || 0), emocion: r.emocion,
  items: (r.detalle_pedidos || []).map((d) => ({ nombre: d.arreglos?.nombre || 'Arreglo', cantidad: d.cantidad, precio: Number(d.precio_unitario) })),
});

export async function listOrders() {
  if (!supabase) return demoOrders();
  const { data, error } = await supabase.from('pedidos')
    .select('id,nombre_destinatario,calle,numero,ciudad,referencia,incluye_mensaje,mensaje,fecha_envio,estado,estado_pago,total,emocion,detalle_pedidos(cantidad,precio_unitario,arreglos(nombre))')
    .order('fecha_envio', { ascending: false }).limit(1000);
  if (error) throw error;
  return data.map(flat);
}

export async function listFlores() {
  if (!supabase) return demoFlores;
  const { data, error } = await supabase.from('flores').select('nombre,tipo,stock,proveedor').order('stock');
  if (error) throw error;
  return data;
}

export async function setEstado(id, estado) {
  if (!supabase) return;
  const { error } = await supabase.from('pedidos').update({ estado }).eq('id', id);
  if (error) throw error;
  await supabase.from('pedido_eventos').insert({ pedido_id: id, estado });
}

// El precio lo calcula el servidor: el navegador solo manda qué arreglo y los datos de entrega.
export async function crearPedido(body) {
  const { data, error } = await supabase.functions.invoke('crear-pedido', { body });
  if (error || data?.error) throw new Error(data?.error || 'No pudimos iniciar el pago.');
  return data.url;
}
