// src/app/components/productos/productos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService, Producto } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
agregarAlCarrito(_t6: Producto) {
throw new Error('Method not implemented.');
}
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }
}