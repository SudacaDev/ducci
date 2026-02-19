"use client";
import { useState, useEffect, useCallback } from "react";

import type {
  Momento,
  MomentoCategoria,
  MomentoInsert,
  MomentoUpdate,
} from "@/types/momentos";
import { supabase } from "@/lib/supabase";

export function useMomentos(initialCategoria: MomentoCategoria = "todos") {
  const [momentos, setMomentos] = useState<Momento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoria, setCategoria] =
    useState<MomentoCategoria>(initialCategoria);

  const fetchMomentos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("momentos")
        .select(`
          *,
          branch:branches(id, name)
        `)
        .eq("activo", true)
        .order("destacado", { ascending: false })
        .order("fecha", { ascending: false })
        .order("orden", { ascending: true });

      if (categoria !== "todos") {
        query = query.eq("categoria", categoria);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setMomentos(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar momentos");
      console.error("Error fetching momentos:", err);
    } finally {
      setLoading(false);
    }
  }, [categoria]);

  useEffect(() => {
    fetchMomentos();
  }, [fetchMomentos]);

  const changeCategoria = (newCategoria: MomentoCategoria) => {
    setCategoria(newCategoria);
  };

  return {
    momentos,
    loading,
    error,
    categoria,
    changeCategoria,
    refetch: fetchMomentos,
  };
}
