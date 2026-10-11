import { seedProducts } from '../data/products';
const day = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const nombres = ['Ana Martínez', 'Luis Pérez', 'Sofía Ruiz', 'Marco Díaz', 'Elena Torres', 'Pablo Núñez', 'Lucía Vega'];
const calles = ['Av. Universidad 120', 'Calle Hidalgo 45', 'Blvd. Bernardo Quintana 300', 'Calle 5 de Mayo 18'];
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

export function demoOrders() {
  seed = 7;
  return Array.from({ length: 70 }, (_, i) => {
    const back = i < 8 ? 0 : Math.floor(rnd() * 14);
    const p = seedProducts[Math.floor(rnd() * seedProducts.length)];
    const q = rnd() > 0.85 ? 2 : 1;
    return {
      id: `demo-${i}`, destinatario: nombres[i % nombres.length], direccion: `${calles[i % calles.length]}, Querétaro`,
      referencia: i % 3 === 0 ? 'Portón negro, tocar timbre' : '', mensaje: i % 2 ? 'Gracias por todo, te quiero mucho.' : '',
      fecha: day(-back), estado: back ? 'entregado' : ['por_armar', 'armado', 'en_ruta'][i % 3],
      pago: rnd() > 0.9 ? 'pendiente' : 'pagado', total: p.price * q, emocion: p.emotions[0],
      items: [{ nombre: p.name, cantidad: q, precio: p.price }],
    };
  });
}
export const demoFlores = [
  { nombre: 'Rosa roja tallo largo', tipo: 'rosa', stock: 12, proveedor: 'Floraplan' },
  { nombre: 'Girasol', tipo: 'girasol', stock: 48, proveedor: 'Campo Alto' },
  { nombre: 'Peonía', tipo: 'peonia', stock: 6, proveedor: 'Importadora Bloom' },
  { nombre: 'Tulipán mixto', tipo: 'tulipan', stock: 80, proveedor: 'Campo Alto' },
  { nombre: 'Lisianthus blanco', tipo: 'lisianthus', stock: 18, proveedor: 'Floraplan' },
];
