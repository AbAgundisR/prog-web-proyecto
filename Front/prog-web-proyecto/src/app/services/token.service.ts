import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveLoggedUser(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getLoggedUser(): User | null {
    const token: User = localStorage.getItem('token') != null ? JSON.parse(localStorage.getItem('token') || "") : null;
    return token;
  }

  removeLoggedUser() {
    localStorage.removeItem('token');
  }
}
