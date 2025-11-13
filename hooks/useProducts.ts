import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { ProductDB, ProductBranch, Branch } from '@/lib/supabase/types';
import type { Product } from '@/types/product.type';

export const useProductsDB = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch products con sus relaciones
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select(`
            *,
            product_branches (
              branch_id,
              is_available,
              branches (*)
            )
          `)
          .eq('is_active', true);

        if (productsError) throw productsError;

        // Transformar datos de Supabase al formato del frontend
        const transformedProducts: Product[] = (productsData || []).map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
          type: product.type,
          branches: product.product_branches
            .filter((pb: any) => pb.is_available)
            .map((pb: any) => ({
              id: pb.branches.id,
              name: pb.branches.name,
              address: pb.branches.address,
            })),
          config: {
            maxFlavors: product.max_flavors,
            weight: product.weight,
            maxQuantity: product.max_quantity,
            boxQuantity: product.box_quantity,
            isAvailable: true,
          },
        }));

        setProducts(transformedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar productos');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};