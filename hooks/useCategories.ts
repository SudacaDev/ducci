import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/supabase/types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("is_active", true)
          .order("display_order");

        if (error) throw error;

        setCategories(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar categorías",
        );
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
