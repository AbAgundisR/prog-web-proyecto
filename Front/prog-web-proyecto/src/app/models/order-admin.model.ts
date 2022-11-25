import { Cart } from "./cart.model";

export interface OrderAdmin {
  id: number;
  order_number: Cart[];
  user_id: number;
  total: number;
  status: string;
}
