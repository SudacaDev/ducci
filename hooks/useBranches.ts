import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Branch } from '@/lib/supabase/types';

export const useBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('branches')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (error) throw error;

        setBranches(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar sucursales');
        console.error('Error fetching branches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return { branches, loading, error };
};