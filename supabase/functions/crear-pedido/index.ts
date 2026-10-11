// Crea el pedido con el precio de la base de datos y abre Stripe Checkout.
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const { arreglo_id, delivery, card, emocion } = await req.json();
    if (!delivery?.name?.trim() || !delivery?.address?.trim() || !delivery?.date) throw new Error('Faltan datos de entrega.');
    if (delivery.date < new Date().toISOString().slice(0, 10)) throw new Error('La fecha de entrega ya pasó.');

    const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: a } = await db.from('arreglos').select('id,nombre,precio').eq('id', arreglo_id).eq('activo', true).single();
    if (!a) throw new Error('Ese arreglo ya no está disponible.');

    const mensaje = card?.message?.trim() ? [card.to && `Para ${card.to}`, card.message.trim(), card.from && `Con cariño, ${card.from}`].filter(Boolean).join('\n') : null;
    const { data: p, error } = await db.from('pedidos').insert({
      nombre_destinatario: delivery.name.trim(), telefono_destinatario: delivery.phone || null,
      calle: delivery.address.trim(), numero: 'S/N', codigo_postal: '00000', ciudad: Deno.env.get('CIUDAD') ?? 'Querétaro', // TODO: separar la dirección en campos
      incluye_mensaje: !!mensaje, mensaje, fecha_envio: delivery.date, estado: 'por_armar',
      total: a.precio, estado_pago: 'pendiente', emocion,
    }).select('id').single();
    if (error) throw error;
    await db.from('detalle_pedidos').insert({ pedido_id: p.id, arreglo_id: a.id, cantidad: 1, precio_unitario: a.precio });

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
    const site = Deno.env.get('SITE_URL')!;
    const s = await stripe.checkout.sessions.create({
      mode: 'payment', payment_method_types: ['card', 'oxxo'],
      line_items: [{ quantity: 1, price_data: { currency: 'mxn', unit_amount: Math.round(Number(a.precio) * 100), product_data: { name: a.nombre } } }],
      metadata: { pedido_id: p.id }, success_url: `${site}/?pago=ok`, cancel_url: `${site}/?pago=cancelado`,
    });
    await db.from('pedidos').update({ pasarela_ref: s.id }).eq('id', p.id);
    return json({ url: s.url });
  } catch (e) { return json({ error: (e as Error).message }, 400); }
});
