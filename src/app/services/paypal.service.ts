import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('paypal-script')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paypal-script';
      script.src = 'https://www.paypal.com/sdk/js?client-id=AZV7u_LpMa_6HPCHbDdYHN48us0rQzCLyqOd9E1I41RYJIBHpUwsJKye3tir8-ASQrv7ZIT_UbyzYKZI';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Error al cargar PayPal SDK'));

      document.body.appendChild(script);
    });
  }

  initPayPal(): Promise<any> {
    return this.loadScript().then(() => {
      if (window['paypal']) {
        return window['paypal'];
      } else {
        throw new Error('PayPal SDK no está disponible');
      }
    });
  }
}
