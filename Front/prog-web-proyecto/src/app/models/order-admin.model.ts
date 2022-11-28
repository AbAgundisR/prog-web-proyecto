import { Carrito } from "./carrito.model";

export interface OrderAdmin {
  id: number;
  order_number: Carrito[];
  user_id: number;
  total: number;
  status: string;
}
