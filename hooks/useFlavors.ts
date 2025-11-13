import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { FlavorDB } from '@/lib/supabase/types';
import type { Product } from '@/types/product.type';

export const useFlavorsDB = () => {
  const [flavors, setFlavors] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        setLoading(true);

        // Fetch flavors con sus relaciones
        const { data: flavorsData, error: flavorsError } = await supabase
          .from('flavors')
          .select(`
            *,
            flavor_branches (
              branch_id,
              is_available,
              branches (*)
            )
          `)
          .eq('is_active', true);

        if (flavorsError) throw flavorsError;

        // Transformar datos de Supabase al formato del frontend
        const transformedFlavors: Product[] = (flavorsData || []).map((flavor: any) => ({
          id: flavor.id,
          name: flavor.name,
          price: 0, // Los sabores no tienen precio
          category: flavor.category,
          description: flavor.description,
          image: flavor.image,
          type: 'flavor-selection',
          branches: flavor.flavor_branches
            .filter((fb: any) => fb.is_available)
            .map((fb: any) => ({
              id: fb.branches.id,
              name: fb.branches.name,
              address: fb.branches.address,
            })),
          config: undefined,
        }));

        setFlavors(transformedFlavors);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar sabores');
        console.error('Error fetching flavors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlavors();
  }, []);

  return { flavors, loading, error };
};