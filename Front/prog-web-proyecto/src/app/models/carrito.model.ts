import { Producto } from "./producto.model";

export interface Carrito {
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
  product: Producto
  active: boolean
}
