interface Base {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Activable {
  is_active: boolean;
}

 
export interface Category extends Base, Activable {
  slug: string;
  description: string;
  color: string | null;
  image: string | null;
  display_order: number;
}

 
interface Categorizable {
  description: string;
  image: string | null;
  category_id: number;
}

export interface Branch extends Base, Activable {
  address: string;
  phone: string | null;
}

export interface ProductDB extends Base, Activable, Categorizable {
  price: number;
  type: 'flavor-selection' | 'quantity-selection' | 'single-item' | 'box';
  
  max_flavors: number | null;
  weight: number | null;
  max_quantity: number | null;
  box_quantity: number | null;
}

export interface FlavorDB extends Base, Activable, Categorizable {}

interface BaseRelation {
  id: number;
  is_available: boolean;
  created_at: string;
}

export interface ProductBranch extends BaseRelation {
  product_id: number;
  branch_id: number;
}

export interface FlavorBranch extends BaseRelation {
  flavor_id: number;
  branch_id: number;
}