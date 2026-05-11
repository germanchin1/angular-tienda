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

  constructor() { }

  login(email: string, password: string) {
    return this.http.post<{ user: User, access_token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          this.saveAuthData(res.user, res.access_token);
          this.currentUser.set(res.user);
        })
      );
  }

  register(full_name: string, email: string, password: string, isAdmin = false) {
    return this.http.post<{ user: User, access_token: string }>(`${this.apiUrl}/register`, { full_name, email, password, is_admin: isAdmin })
      .pipe(
        tap(res => {
          if (res.access_token) {
            this.saveAuthData(res.user, res.access_token);
            this.currentUser.set(res.user);
          }
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
    return !!this.getToken() && this.currentUser()?.role === 'admin';
  }

  isLoggedIn() {
    return !!this.getToken() && !!this.currentUser();
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
