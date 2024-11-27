// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PagoComponent } from './pago/pago.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago', component:PagoComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];