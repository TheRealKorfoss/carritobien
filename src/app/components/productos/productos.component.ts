import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService, Producto } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService
  ) { 
    console.log('ProductosComponent constructor');
  }

  ngOnInit() {
    console.log('ProductosComponent ngOnInit - Intentando obtener productos');
    this.productosService.getProductos().subscribe({
      next: (data) => {
        console.log('Productos recibidos:', data);
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
      complete: () => {
        console.log('Completada la carga de productos');
      }
    });
  }

  agregarAlCarrito(producto: any): void {
    console.log('Agregando al carrito:', producto);
    this.carritoService.agregarProducto(producto);
    this.mostrarMensaje('Producto agregado al carrito');
  }

  mostrarMensaje(mensaje: string): void {
    const mensajeElemento = document.getElementById('mensaje');
    if (mensajeElemento) {
      mensajeElemento.innerText = mensaje;
      setTimeout(() => {
        mensajeElemento.innerText = '';
      }, 3000);
    }
  }
}