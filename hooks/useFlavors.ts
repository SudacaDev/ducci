import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/product.type';

interface UseFlavorsParams {
  categorySlug?: string | null;
  branchId?: number | null;
  limit?: number;
}

interface UseFlavorsReturn {
  flavors: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFlavorsDB = ({
  categorySlug = null,
  branchId = null,
  limit,
}: UseFlavorsParams = {}): UseFlavorsReturn => {
  const [flavors, setFlavors] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlavors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching flavors with filters:', {
        categorySlug,
        branchId,
      });

      // ============================================
      // BASE QUERY
      // ============================================
      let query = supabase
  .from('flavors')
  .select(`
    id,
    name,
    description,
    image,
    is_active,
    category_id,
    categories!inner (
      id,
      name,
      slug,
      color
    ),
    flavor_branches!inner (
      branch_id,
      is_available,
      branches (
        id,
        name,
        address
      )
    )
  `)
  .eq('is_active', true)
  .eq('flavor_branches.is_available', true);

      // ============================================
      // FILTRO POR CATEGORÍA
      // ============================================
      if (categorySlug && categorySlug !== 'todos') {
        query = query.eq('categories.slug', categorySlug);
      }

      // ============================================
      // FILTRO POR SUCURSAL
      // ============================================
      if (branchId !== null) {
        query = query
          .eq('flavor_branches.branch_id', branchId)
          .eq('flavor_branches.is_available', true);
      }

      // ============================================
      // ORDENAMIENTO
      // ============================================
      query = query.order('name', { ascending: true });

      // ============================================
      // LÍMITE
      // ============================================
      if (limit) {
        query = query.limit(limit);
      }

      // ============================================
      // EJECUTAR QUERY
      // ============================================
      const { data: flavorsData, error: flavorsError } = await query;

      if (flavorsError) throw flavorsError;

      console.log(`✅ Fetched ${flavorsData?.length || 0} flavors`);

      // ============================================
// TRANSFORMAR DATOS
// ============================================
 
const transformedFlavors: Product[] = (flavorsData || []).map((flavor: any) => {
  // Agrupar sucursales únicas
  const branchMap = new Map<number, { id: number; name: string; address: string }>();
  
  flavor.flavor_branches.forEach((fb: any) => {
    if (!branchMap.has(fb.branches.id)) {
      branchMap.set(fb.branches.id, {
        id: fb.branches.id,
        name: fb.branches.name,
        address: fb.branches.address,
      });
    }
  });

  const uniqueBranches = Array.from(branchMap.values());

  return {
    id: flavor.id,
    name: flavor.name,
    price: 0,
    category: flavor.categories?.slug || 'otros',
    description: flavor.description,
    image: flavor.image,
    type: 'flavor-selection' as const,
    branches: uniqueBranches,
    config: undefined,
  };
});

setFlavors(transformedFlavors);
setFlavors(transformedFlavors);

      setFlavors(transformedFlavors);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar sabores';
      setError(errorMessage);
      console.error('❌ Error fetching flavors:', err);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, branchId, limit]);

  // ============================================
  // FETCH INICIAL Y CUANDO CAMBIEN LOS FILTROS
  // ============================================
  useEffect(() => {
    fetchFlavors();
  }, [fetchFlavors]);

  return { flavors, loading, error, refetch: fetchFlavors };
};