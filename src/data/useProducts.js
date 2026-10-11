import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { seedProducts } from './products';

const toProduct = (r) => ({
  id: r.id, name: r.nombre, price: Number(r.precio), image: r.imagen_url || '', palette: r.palette,
  emotions: r.emociones, tags: r.tags, badges: r.badges, contiene: r.contiene, durabilidad: r.durabilidad,
  porQueLeEncantara: r.por_que_le_encantara, nivelDeImpacto: r.nivel_de_impacto, porQueRegalarlo: r.por_que_regalarlo,
});

export function useProducts() {
  const [state, setState] = useState(supabase ? { products: [], status: 'loading' } : { products: seedProducts, status: 'ready' });
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase.from('arreglos').select('*').eq('activo', true).order('created_at').then(({ data, error }) => {
      if (!alive) return;
      setState(error || !data.length ? { products: [], status: 'error' } : { products: data.map(toProduct), status: 'ready' });
    });
    return () => { alive = false; };
  }, []);
  return state;
}
