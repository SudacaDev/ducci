export type MomentoCategoria = "todos" | "combos" | "lunes_a_jueves" | "viernes_a_domingo";  
 
  

export interface Momento {
  id: string;
  titulo: string;
  descripcion: string | null;
  categoria: MomentoCategoria;
  evento: string | null;
  imagen_url: string;
  imagen_alt: string | null;
  branch_id: number | null;
  fecha: string | null;
  destacado: boolean;
  activo: boolean;
  orden: number;
  created_at: string;
  updated_at: string;

  branch?: {
    id: string;
    name: string;
  };
}

export interface MomentoInsert {
  titulo: string;
  descripcion?: string | null;
  categoria: MomentoCategoria;
  evento?: string | null;
  imagen_url: string;
  imagen_alt?: string | null;
  branch_id?: number | null;
  fecha?: string | null;
  destacado?: boolean;
  activo?: boolean;
  orden?: number;
}

export interface MomentoUpdate extends Partial<MomentoInsert> {
  id: string;
}

export const CATEGORIA_LABELS: Record<MomentoCategoria, string> = {
  todos: "Todos",
  combos: "Combos",
  lunes_a_jueves: "Lunes a Jueves",
  viernes_a_domingo: "viernes a Domingo",
};
