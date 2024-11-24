import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { PaypalService } from '../../services/paypal.service';
import { ProductoCarrito } from '../../services/carrito.service';
import type { PayPalNamespace } from "@paypal/paypal-js";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  @ViewChild('paypalContainer') paypalContainer!: ElementRef;
  productosCarrito: ProductoCarrito[] = [];

  constructor(
    private carritoService: CarritoService,
    private paypalService: PaypalService
  ) { }

  ngOnInit() {
    this.carritoService.getCarrito().subscribe(productos => {
      this.productosCarrito = productos;
    });
  }

  ngAfterViewInit() {
    if (this.productosCarrito.length > 0) {
      this.initPayPalButton();
    }
  }

  async initPayPalButton() {
    try {
      const paypal = await this.paypalService.initPayPal();

      // Verificamos que paypal y paypal.Buttons estén definidos
      if (paypal && paypal.Buttons) {  
        await paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.obtenerTotal().toString(),
                  currency_code: "MXN"
                }
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();
            console.log('Pago completado', order);
            this.completarCompra(order);
          },
          onError: (err: any) => {
            console.error('Error en el pago:', err);
            alert('Hubo un error al procesar el pago');
          }
        }).render(this.paypalContainer.nativeElement);
      } else {
        console.error('PayPal SDK no está disponible o no se inicializó correctamente.');
      }
    } catch (error) {
      console.error("Error al inicializar PayPal:", error);
    }
  }

  completarCompra(orderDetails: any) {
    alert('¡Compra completada con éxito!');
    this.carritoService.limpiarCarrito();
  }

  obtenerTotal(): number {
    return this.carritoService.obtenerTotal();
  }

  actualizarCantidad(producto: ProductoCarrito, cambio: number) {
    const nuevaCantidad = producto.cantidad_seleccionada + cambio;
    if (nuevaCantidad > 0 && nuevaCantidad <= producto.cantidad) {
      this.carritoService.actualizarCantidad(producto.id, nuevaCantidad);
    }
  }

  eliminarProducto(productoId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.carritoService.eliminarProducto(productoId);
    }
  }
}
