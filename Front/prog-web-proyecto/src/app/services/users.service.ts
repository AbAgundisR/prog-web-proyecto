import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { User } from './../models/user.model';
import { Auth } from './../models/auth.model';
import { TokenService } from './../services/token.service';
import { checkToken } from '../interceptors/token.interceptor';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  headers = {
    "Access-Control-Allow-Origin": "*"
  }

  private apiUrl = `${environment.API_URL}`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(data: Partial<User>) {
    return this.http.post<User>(`${this.apiUrl}/Users/login.php`, data, { headers: this.headers });
  }

  logout() {
    this.tokenService.removeLoggedUser()
  }

  getUserLogged(): User | null {
    const token: User = localStorage.getItem('token') != null ? JSON.parse(localStorage.getItem('token') || "") : null;
    return token;
  }

  getUser(id: number) {
    return this.http.get<any>(`${this.apiUrl}/Users/readone.php`, { context: checkToken() });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/Users/delete.php`, { context: checkToken() });
  }

  getAllUsers() {
    return this.http.get<any>(`${this.apiUrl}/Users/read.php`, { context: checkToken() });
  }

  createUser(data: Partial<User>) {
    return this.http.post<User>(`${this.apiUrl}/Users/create.php`, data, { headers: environment.headers });
  }

  updateUser(id: number, data: Partial<User>) {
    return this.http.put(`${this.apiUrl}/Users/update.php`, data, { context: checkToken() });
  }
}
