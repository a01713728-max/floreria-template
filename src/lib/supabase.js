import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Sin variables, la app funciona en modo demo (catálogo local y datos de ejemplo).
export const supabase = url && key ? createClient(url, key) : null;
