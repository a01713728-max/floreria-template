# Florería: tienda + pagos + dashboards

Vite + React + Tailwind + Supabase + Stripe.

## Rutas
- `/` tienda (catálogo, orientador, pedido por WhatsApp y pago en línea)
- `/admin` dashboard de administración (rol `admin`)
- `/equipo` pedidos del día para empleados (rol `empleado` o `admin`)
- `/login` acceso al panel (hay un enlace "Acceso del equipo" en el pie de la tienda). Al entrar, el admin va a `/admin` y el empleado a `/equipo`

## Probar ahora (sin base de datos)
```
npm install
npm run dev
```
Sin variables de entorno todo funciona en **modo demo**: catálogo local y dashboards con datos de ejemplo.

## Conectar la base de datos
1. Copia `.env.example` a `.env` y pon tu URL y anon key de Supabase. En Vercel, agrega las mismas dos variables y haz Redeploy.
2. En el SQL Editor corre, en orden: `001_schema.sql` (omítelo si ya corriste la migración del Paso 1.2), `002_extras.sql` y `003_seed.sql`.
3. Crea tu usuario en Authentication y promuévelo: `update perfiles set rol='admin' where id='<uuid>';`
4. Para un empleado: crea su usuario y `update perfiles set rol='empleado' where id='<uuid>';`

## Activar pagos (Stripe)
```
supabase functions deploy crear-pedido
supabase functions deploy stripe-webhook --no-verify-jwt
supabase secrets set STRIPE_SECRET_KEY=sk_... STRIPE_WEBHOOK_SECRET=whsec_... SITE_URL=https://tu-sitio.vercel.app
```
En Stripe, crea un webhook a `https://<proyecto>.supabase.co/functions/v1/stripe-webhook` con los eventos `checkout.session.completed` y `checkout.session.async_payment_succeeded`.

## Pendiente (siguientes pasos)
- Separar la dirección en calle, número y código postal (hoy `crear-pedido` guarda la dirección completa en `calle`).
- Descontar stock al pagar usando `arreglo_flores`, y subir la foto previa a Storage.
- Limitar con una política más fina qué columnas puede cambiar un empleado.
- Recordatorios de fechas, seguimiento público del pedido y rendimiento por empleado.
