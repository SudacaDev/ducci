import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/product.type';

interface UseProductsParams {
  categorySlug?: string | null;
  branchId?: number | null;
  sortOrder?: 'asc' | 'desc' | 'none';
  limit?: number;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProductsDB = ({
  categorySlug = null,
  branchId = null,
  sortOrder = 'none',
  limit,
}: UseProductsParams = {}): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching products with filters:', {
        categorySlug,
        branchId,
        sortOrder,
      });

      // ============================================
      // BASE QUERY
      // ============================================
      let query = supabase
  .from('products')
  .select(`
    id,
    name,
    price,
    description,
    image,
    type,
    max_flavors,
    weight,
    max_quantity,
    box_quantity,
    is_active,
    category_id,
    categories!inner (
      id,
      name,
      slug,
      color
    ),
    product_branches!inner (
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
  .eq('product_branches.is_available', true);

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
          .eq('product_branches.branch_id', branchId)
          .eq('product_branches.is_available', true);
      }

      // ============================================
      // ORDENAMIENTO
      // ============================================
      if (sortOrder === 'asc') {
        query = query.order('price', { ascending: true });
      } else if (sortOrder === 'desc') {
        query = query.order('price', { ascending: false });
      } else {
        query = query.order('name', { ascending: true });
      }

      // ============================================
      // LÍMITE (para paginación futura)
      // ============================================
      if (limit) {
        query = query.limit(limit);
      }

      // ============================================
      // EJECUTAR QUERY
      // ============================================
      const { data: productsData, error: productsError } = await query;

      if (productsError) throw productsError;

      console.log(`✅ Fetched ${productsData?.length || 0} products`);

      // ============================================
      // TRANSFORMAR DATOS
      // ============================================
 
// ============================================
// TRANSFORMAR DATOS
// ============================================
const transformedProducts: Product[] = (productsData || []).map((product: any) => {
  // Agrupar sucursales (puede haber duplicados por el join)
  const branchMap = new Map<number, { id: number; name: string; address: string }>();
  
  product.product_branches.forEach((pb: any) => {
    if (!branchMap.has(pb.branches.id)) {
      branchMap.set(pb.branches.id, {
        id: pb.branches.id,
        name: pb.branches.name,
        address: pb.branches.address,
      });
    }
  });

  const uniqueBranches = Array.from(branchMap.values());

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.categories?.slug || 'otros',
    description: product.description,
    image: product.image,
    type: product.type as Product['type'],
    branches: uniqueBranches,
    config: {
      maxFlavors: product.max_flavors,
      weight: product.weight,
      maxQuantity: product.max_quantity,
      boxQuantity: product.box_quantity,
      isAvailable: true,
    },
  };
});

setProducts(transformedProducts);

setProducts(transformedProducts);

      setProducts(transformedProducts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(errorMessage);
      console.error('❌ Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, branchId, sortOrder, limit]);

  // ============================================
  // FETCH INICIAL Y CUANDO CAMBIEN LOS FILTROS
  // ============================================
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
};