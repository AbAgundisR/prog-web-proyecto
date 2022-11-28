import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../models/pedido.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  // setOrderAsCompleted(id: number) {
  //   //here we must give a token
  //   return this.http.post<Order>(`${this.apiUrl}/orders/${id}`);
  //  }

  getAllOrders() {
    return this.http.get<any>(`${this.apiUrl}/Pedidos/read.php`);
  }

  getOrder(order: any) {
    return this.http.get<any>(`${this.apiUrl}/Pedidos/readone.php`);
  }

  createOrder(data: Partial<Pedido>) {
    return this.http.post<Pedido>(`${this.apiUrl}/Pedidos/create.php`, data);
  }

  updateOrder(id: number, data: Partial<Pedido>) {
    return this.http.put(`${this.apiUrl}/Pedidos/update.php`, data);
  }
}
