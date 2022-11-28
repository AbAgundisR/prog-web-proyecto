import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<any>(`${this.apiUrl}/Productos/read.php`);
  }

  getProduct(id: number) {
    return this.http.get<any>(`${this.apiUrl}/Productos/readone.php`);
  }

  createProduct(data: Partial<Producto>) {
    return this.http.post(`${this.apiUrl}/Productos/create.php`, data);
  }

  updateProduct(id: number, data: any) {
    return this.http.put<Producto>(`${this.apiUrl}/Productos/update.php`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/Productos/delete.php`);
  }
}
