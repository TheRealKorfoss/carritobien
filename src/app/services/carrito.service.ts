// carrito.service.ts
export interface ProductoCarrito extends Producto {
  cantidad_seleccionada: number; 
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from './productos.service'; 

@Injectable({
  providedIn: 'root'  
})
export class CarritoService {
  private productosEnCarrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>([]);

  constructor() { }

  // Devuelve un observable del carrito
  getCarrito() {
    return this.carritoSubject.asObservable();
  }

  // Agrega un producto al carrito
  agregarProducto(producto: Producto) {
    const productoExistente = this.productosEnCarrito.find(item => item.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad_seleccionada += 1;
    } else {
      this.productosEnCarrito.push({
        ...producto,
        cantidad_seleccionada: 1
      });
    }

    this.carritoSubject.next(this.productosEnCarrito);
  }

  // Elimina un producto del carrito
  eliminarProducto(productoId: number) {
    this.productosEnCarrito = this.productosEnCarrito.filter(item => item.id !== productoId);
    this.carritoSubject.next(this.productosEnCarrito);
  }

  // Actualiza la cantidad de un producto en el carrito
  actualizarCantidad(productoId: number, cantidad: number) {
    const producto = this.productosEnCarrito.find(item => item.id === productoId);
    if (producto) {
      producto.cantidad_seleccionada = cantidad;
      this.carritoSubject.next(this.productosEnCarrito);
    }
  }

  // Calcula el total del carrito
  obtenerTotal(): number {
    return this.productosEnCarrito.reduce((total, item) => 
      total + (item.precio * item.cantidad_seleccionada), 0);
  }

  // Limpia el carrito
  limpiarCarrito() {
    this.productosEnCarrito = [];
    this.carritoSubject.next(this.productosEnCarrito);
  }
}
