// Marca el pedido como pagado cuando Stripe lo confirma (también pagos en OXXO, que llegan después).
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17';

Deno.serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
  try {
    const ev = await stripe.webhooks.constructEventAsync(await req.text(), req.headers.get('stripe-signature')!, Deno.env.get('STRIPE_WEBHOOK_SECRET')!);
    if (['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(ev.type)) {
      const s = ev.data.object as Stripe.Checkout.Session;
      if (s.payment_status === 'paid' && s.metadata?.pedido_id) {
        const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
        await db.from('pedidos').update({ estado_pago: 'pagado' }).eq('id', s.metadata.pedido_id);
        await db.from('pedido_eventos').insert({ pedido_id: s.metadata.pedido_id, estado: 'pagado' });
      }
    }
    return new Response('ok');
  } catch (e) { return new Response((e as Error).message, { status: 400 }); }
});
