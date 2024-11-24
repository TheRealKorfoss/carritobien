// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PagoComponent } from './pago/pago.component';

export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  {path: 'pago', component:PagoComponent}
];