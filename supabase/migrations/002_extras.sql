-- Permisos que necesitan los dashboards. Ejecutar después de 001 (o después de tu migración del Paso 1.2).
alter table pedidos alter column estado set default 'por_armar';
create policy "staff ve detalle" on detalle_pedidos for select using (rol_actual() in ('empleado','admin'));
create policy "staff ve eventos" on pedido_eventos for select using (rol_actual() in ('empleado','admin'));
create policy "staff registra eventos" on pedido_eventos for insert with check (rol_actual() in ('empleado','admin'));
create policy "admin ve clientes" on clientes for select using (rol_actual() = 'admin');
create policy "admin ve empleados" on empleados for select using (rol_actual() = 'admin');
create policy "empleado se ve a si mismo" on empleados for select using (user_id = auth.uid());
