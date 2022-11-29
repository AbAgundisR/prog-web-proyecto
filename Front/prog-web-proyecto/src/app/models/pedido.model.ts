export interface Pedido {
  pedido_ID: number;
  user_ID: number;
  subtotal: number;
  iva: number;
  total: number;
  direccion: string;
  ciudad: string;
  estado: string;
  cp: string;
  telefono: string;

  order_number: number;
  cart_id: number;
  // user_id: number;
  status: string
}
