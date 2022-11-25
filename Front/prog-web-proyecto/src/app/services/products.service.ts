import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<any>(`${this.apiUrl}/products`);
  }

  getAllProductsByCategory(categoryId: number) {
    return this.http.get<any>(`${this.apiUrl}/products-by-category/${categoryId}`);
  }

  getProductsOnStock() {
    return this.http.get<any>(`${this.apiUrl}/products-on-stock`);
  }

  getProduct(id: number) {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(data: Partial<Product>) {
    return this.http.post(`${this.apiUrl}/products/`, data);
  }

  updateProduct(id: number, data: any) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  searchProduct(data: Partial<Product>) {
    return this.http.post<any>(`${this.apiUrl}/products-search`, data);
  }
}
