-- Ejecutar solo si NO corriste ya la migración del Paso 1.2. Requiere tus tablas base (flores, clientes, empleados, pedidos, detalle_pedidos).
create type rol_usuario as enum ('cliente','empleado','admin');
create table perfiles (id uuid primary key references auth.users(id) on delete cascade, rol rol_usuario not null default 'cliente');

create function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into perfiles (id) values (new.id); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

create function rol_actual() returns rol_usuario language sql stable security definer set search_path = public as
$$ select rol from perfiles where id = auth.uid() $$;

alter table clientes  add column user_id uuid unique references auth.users(id);
alter table empleados add column user_id uuid unique references auth.users(id);

create table arreglos (
  id uuid primary key default gen_random_uuid(), slug text unique not null, nombre text not null,
  precio numeric not null check (precio >= 0), imagen_url text,
  palette text[] not null default '{#E8607F,#F4B400,#FBF6EE}', emociones text[] not null default '{}',
  tags text[] not null default '{}', badges text[] not null default '{}',
  contiene text, durabilidad text, por_que_le_encantara text, nivel_de_impacto text, por_que_regalarlo text,
  activo boolean not null default true, created_at timestamptz default now()
);
create table arreglo_flores (
  arreglo_id uuid references arreglos(id) on delete cascade, flor_id uuid references flores(id),
  cantidad int4 not null check (cantidad > 0), primary key (arreglo_id, flor_id)
);
alter table pedidos add column total numeric, add column estado_pago text not null default 'pendiente',
  add column pasarela_ref text, add column foto_previa_url text, add column emocion text;
alter table detalle_pedidos add column arreglo_id uuid references arreglos(id);
create table pedido_eventos (
  id uuid primary key default gen_random_uuid(), pedido_id uuid not null references pedidos(id) on delete cascade,
  estado text not null, empleado_id uuid references empleados(id), created_at timestamptz default now()
);

alter table perfiles enable row level security; alter table clientes enable row level security;
alter table empleados enable row level security; alter table flores enable row level security;
alter table arreglos enable row level security; alter table arreglo_flores enable row level security;
alter table pedidos enable row level security; alter table detalle_pedidos enable row level security;
alter table pedido_eventos enable row level security;

create policy "catalogo publico" on arreglos for select using (activo or rol_actual() = 'admin');
create policy "admin escribe arreglos" on arreglos for all using (rol_actual() = 'admin') with check (rol_actual() = 'admin');
create policy "recetas lectura staff" on arreglo_flores for select using (rol_actual() in ('empleado','admin'));
create policy "admin escribe recetas" on arreglo_flores for all using (rol_actual() = 'admin') with check (rol_actual() = 'admin');
create policy "flores staff" on flores for select using (rol_actual() in ('empleado','admin'));
create policy "admin escribe flores" on flores for all using (rol_actual() = 'admin') with check (rol_actual() = 'admin');
create policy "ver mi perfil" on perfiles for select using (id = auth.uid() or rol_actual() = 'admin');
create policy "cliente ve sus pedidos" on pedidos for select
  using (cliente_id in (select id from clientes where user_id = auth.uid()) or rol_actual() in ('empleado','admin'));
create policy "staff actualiza pedidos" on pedidos for update using (rol_actual() in ('empleado','admin'));
