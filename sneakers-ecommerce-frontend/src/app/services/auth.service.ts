import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor() {}

  login(email: string, contrasena: string) {
    return this.http.post<{ user: User, token: string }>(`${this.apiUrl}/login`, { email, contrasena })
      .pipe(
        tap(res => {
          this.saveAuthData(res.user, res.token);
          this.currentUser.set(res.user);
        })
      );
  }

  register(nombre: string, email: string, contrasena: string) {
    return this.http.post<{ user: User, token: string }>(`${this.apiUrl}/register`, { nombre, email, contrasena })
      .pipe(
        tap(res => {
          this.saveAuthData(res.user, res.token);
          this.currentUser.set(res.user);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    return this.currentUser()?.role === 'Administrador';
  }

  isLoggedIn() {
    return !!this.currentUser();
  }

  private saveAuthData(user: User, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
