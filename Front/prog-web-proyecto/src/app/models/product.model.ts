export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  category_id: number;
  category_name?: string;
  description: string;
  stock: number;
  created_at?: Date;
  updated_at?: Date;
}
