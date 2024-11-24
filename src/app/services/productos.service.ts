import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Producto {
  cantidad_seleccionada: number;
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // Cambia el puerto según donde esté corriendo tu backend
  private apiUrl = 'http://localhost:3000/api/productos'; // o el puerto que uses

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      tap(productos => console.log('Productos recibidos:', productos)),
      catchError(error => {
        console.error('Error al obtener productos:', error);
        throw error;
      })
    );
  }
}