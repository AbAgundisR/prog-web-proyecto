import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  headers = {
    "Access-Control-Allow-Origin": "*"
  }

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    console.log("trayendo productos");

    return this.http.get<any>(`${this.apiUrl}/Productos/read.php`, { headers: this.headers });
  }

  getProduct(id: number) {
    console.log(id);

    return this.http.post<any>(`${this.apiUrl}/Productos/readone.php`, { "ID": id }, { headers: this.headers });
  }

  createProduct(data: Partial<Producto>) {
    return this.http.post(`${this.apiUrl}/Productos/create.php`, data, { headers: environment.headers });
  }

  updateProduct(id: number, data: any) {
    return this.http.put<Producto>(`${this.apiUrl}/Productos/update.php`, data, { headers: environment.headers });
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/Productos/delete.php`, { headers: environment.headers });
  }
}
