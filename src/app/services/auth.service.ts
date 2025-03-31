import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7199/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string): Observable<AuthResponse> {
//     const authData: AuthRequest = { email, password };
//     return this.http.post<AuthResponse>(this.apiUrl, authData);
//   }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token); // Store token
      }),
      catchError(error => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Clear token
    this.router.navigate(['/login']); // Redirect to login
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Check if token exists
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
