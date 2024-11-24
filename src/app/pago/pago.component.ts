import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaypalService } from '../services/paypal.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class PagoComponent implements OnInit, OnDestroy {
  totalCarrito: number = 0;
  productosEnCarrito: any[] = [];

  constructor(
    private paypalService: PaypalService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // Obtener los productos del carrito y el total
    this.carritoService.getCarrito().subscribe(productos => {
      this.productosEnCarrito = productos;
      this.totalCarrito = this.carritoService.obtenerTotal();
      this.initializePayPal();
    });
  }

  private initializePayPal(): void {
    this.paypalService.initPayPal().then((paypal) => {
      if (paypal) {
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  currency_code: 'USD',
                  value: this.totalCarrito.toString(),
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: this.totalCarrito.toString()
                    }
                  }
                },
                items: this.productosEnCarrito.map(producto => ({
                  name: producto.nombre,
                  unit_amount: {
                    currency_code: 'USD',
                    value: producto.precio.toString()
                  },
                  quantity: producto.cantidad_seleccionada.toString()
                }))
              }]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              console.log('Pago completado:', details);
              alert(`Pago realizado con éxito. ¡Gracias por tu compra, ${details.payer.name.given_name}!`);
              this.carritoService.limpiarCarrito();
              // Aquí podrías redirigir a una página de confirmación
            });
          },
          onError: (err: any) => {
            console.error("Error al procesar el pago:", err);
            alert("Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.");
          }
        }).render('#paypal-button-container');
      }
    }).catch(error => {
      console.error("Error al cargar PayPal:", error);
    });
  }

  ngOnDestroy(): void {
    // Limpieza si es necesaria
  }
}
