export interface Product {
  id: number;
  name: string;
  price: number;
  category: "clasicos" | "frutales" | "premium" | "veganos" | "especiales";
  description: string;
  image?: string;
}

export interface Category {
  id: string;
  label: string;
}
