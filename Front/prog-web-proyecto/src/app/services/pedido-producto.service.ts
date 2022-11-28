import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PedidoProducto } from '../models/pedido-producto';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {
  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getAllPedidoProducts() {
    return this.http.get<any>(`${this.apiUrl}/Pedidos_productos/create.php`);
  }

  getPedidoProduct(id: number) {
    return this.http.get<any>(`${this.apiUrl}/Pedidos_productos/readone.php`);
  }

  createPedidoProduct(data: Partial<PedidoProducto>) {
    return this.http.post(`${this.apiUrl}/Pedidos_productos/create.php`, data);
  }

  updatePedidoProduct(id: number, data: any) {
    return this.http.put<PedidoProducto>(`${this.apiUrl}/Pedidos_productos/update.php`, data);
  }

  deletePedidoProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/Pedidos_productos/delete.php`);
  }
}
