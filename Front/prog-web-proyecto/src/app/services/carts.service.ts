import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Cart } from '../models/cart.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  headers = {
    "Access-Control-Allow-Origin": "*"
  }

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getUserCart(user_id: number){
    return this.http.get<any>(`${this.apiUrl}/user-cart/${user_id}`, {headers: this.headers})
  }

  getCart(id: number){
    return this.http.get<any>(`${this.apiUrl}/carts/${id}`, {headers: this.headers})
  }

  addToCart(data: any){
    return this.http.post(`${this.apiUrl}/carts`, data, {headers: this.headers});
  }

  updateQuantityProductOnCart(cart_id: number, data: any){
    return this.http.put<any>(`${this.apiUrl}/carts/${cart_id}`, data)
  }

  deleteProductOnCart(cart_id: number){
    return this.http.delete(`${this.apiUrl}/carts/${cart_id}`)
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
