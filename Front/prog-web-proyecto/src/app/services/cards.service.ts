import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Card } from './../models/card.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) { }

  getCard(id: number) {
    return this.http.get<any>(`${this.apiUrl}/card-by-user/${id}`);
  }

  createCard(data: Partial<Card>) {
    return this.http.post<Card>(`${this.apiUrl}/cards`, data);
  }

  updateCard(id: number, data: Partial<Card>) {
    return this.http.put<Card>(`${this.apiUrl}/cards/${id}`, data);
  }

  deleteCard(id: number) {
    return this.http.delete(`${this.apiUrl}/cards/${id}`);
  }
}
