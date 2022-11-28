export interface Producto {
  ID: number;
  code: string;
  nombre: string;
  precio: number;
  category_id: number;
  category_name?: string;
  descripcion: string;
  in_stock: boolean;
  stock: number;
  created_at?: Date;
  updated_at?: Date;
  imagen?: String;
  blanco_negro?: boolean;
}
