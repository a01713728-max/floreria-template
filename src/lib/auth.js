import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export async function rolDe(userId) {
  const { data } = await supabase.from('perfiles').select('rol').eq('id', userId).single();
  return data?.rol || 'cliente';
}

export function useSession() {
  const [s, setS] = useState({ loading: true, session: null, rol: null, demo: false });
  useEffect(() => {
    if (!supabase) { setS({ loading: false, session: null, rol: 'admin', demo: true }); return; }
    const load = async (session) => {
      if (!session) return setS({ loading: false, session: null, rol: null, demo: false });
      setS({ loading: false, session, rol: await rolDe(session.user.id), demo: false });
    };
    supabase.auth.getSession().then(({ data }) => load(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setTimeout(() => load(session), 0));
    return () => sub.subscription.unsubscribe();
  }, []);
  return s;
}
