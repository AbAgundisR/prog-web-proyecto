import { Product } from "./product.model";

export interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
  product_name?: string;
  product_price?: number;
  product_stock: number;
  product: Product
  active: boolean
}
