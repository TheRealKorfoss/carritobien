import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginInterface, RegisterInterface, LoginBackendInterface, LoginResponse } from '../interfaces/auth.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Añadimos /api al final

  constructor(private http: HttpClient) { }

  register(userData: RegisterInterface): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Enviando petición a:', `${this.apiUrl}/register`);
    console.log('Datos:', userData);

    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers,
      observe: 'response'
    });
  }

  login(data: LoginBackendInterface): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data, { headers })
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Client error:', error.error.message);
    } else {
      // El backend retornó un código de error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Retorna un mensaje de error amigable
    return throwError(() => new Error('Algo salió mal. Por favor, intente nuevamente más tarde.'));
  }
}