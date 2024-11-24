import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PaypalService } from './services/paypal.service';
import { CarritoService } from './services/carrito.service';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    PaypalService,
    CarritoService
  ]
};