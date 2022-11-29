export interface PedidoProducto {
    pedido_ID: number;
    producto_id: number;
    cantidad: number;
    talla?: string;
    nombre?: string;
    precio?: number;
}
