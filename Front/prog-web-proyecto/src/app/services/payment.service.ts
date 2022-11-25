import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Payment } from './../models/payment.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getAllPayments() {
    return this.http.get<any>(`${this.apiUrl}/payments`);
  }

  getPayment(id: number) {
    return this.http.get<any>(`${this.apiUrl}/payments/${id}`);
  }

  createPayment(data: Partial<Payment>) {
    return this.http.post<Payment>(`${this.apiUrl}/payments`, data);
  }
}
