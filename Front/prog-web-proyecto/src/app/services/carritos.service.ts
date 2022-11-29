import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../models/carrito.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritosService {
  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getCart(id: number) {
    return this.http.post<any>(`${this.apiUrl}/Carrito/read.php`, { user_ID: id }, { headers: {} })
  }

  addToCart(user_ID: number, product_id: number) {
    return this.http.post(`${this.apiUrl}/Carrito/create.php`, { user_ID: user_ID, producto_id: product_id }, { headers: {} })
  }

  updateQuantityProductOnCart(cart_id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/Carrito/update.php`, data, { headers: environment.headers })
  }

  deleteProductOnCart(cart_id: number) {
    return this.http.delete(`${this.apiUrl}/Carrito/delete.php`, { headers: environment.headers })
  }

  //----------------------------------------------------------------------------------

  // addProduct(product:Cart){
  //   if (localStorage.getItem("Cart") == null){
  //     localStorage.setItem("Cart", JSON.stringify([]));
  //   }
  //   var cart = JSON.parse(localStorage.getItem("Cart") ?? '');

  //   cart.push(product)
  //   localStorage.setItem("Cart", JSON.stringify(cart));
  // }

  // clear(){
  //   if (localStorage.getItem("Cart") != null){
  //     localStorage.setItem("Cart", JSON.stringify([]));
  //   }
  // }

  // removeProduct(product:Cart){
  //   if (localStorage.getItem("Cart") == null){
  //     localStorage.setItem("Cart", JSON.stringify([]));
  //   }
  //   var cart = JSON.parse(localStorage.getItem("Cart") ?? '');

  //   cart.remove(product);
  //   localStorage.setItem("Cart", JSON.stringify(cart));
  // }

  // getCart(){
  //   if (localStorage.getItem("Cart") == null){
  //     localStorage.setItem("Cart", JSON.stringify([]));
  //   }
  //   var cart = JSON.parse(localStorage.getItem("Cart") ?? '');
  //   return cart;
  // }

  // buy(){

  // }
}
