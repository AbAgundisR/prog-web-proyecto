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
    return this.http.get<any>(`${this.apiUrl}/Pedidos_productos/create.php`, { headers: environment.headers });
  }

  getPedidoProducts(pedido_ID: number) {
    return this.http.post<any>(`${this.apiUrl}/Pedidos_productos/read.php`, { pedido_ID: pedido_ID }, { headers: {} });
  }

  getPedidoProduct(id: number) {
    return this.http.get<any>(`${this.apiUrl}/Pedidos_productos/readone.php`, { headers: environment.headers });
  }

  createPedidoProduct(data: Partial<PedidoProducto>) {
    return this.http.post(`${this.apiUrl}/Pedidos_productos/create.php`, data, { headers: environment.headers });
  }

  updatePedidoProduct(id: number, data: any) {
    return this.http.put<PedidoProducto>(`${this.apiUrl}/Pedidos_productos/update.php`, data, { headers: environment.headers });
  }

  deletePedidoProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/Pedidos_productos/delete.php`, { headers: environment.headers });
  }
}
