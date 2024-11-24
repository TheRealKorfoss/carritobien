import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <nav class="flex justify-between items-center h-16">
          <a routerLink="/productos" class="text-xl font-bold text-blue-600">
            JoyasLocas
          </a>
          <a routerLink="/carrito" class="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <span>🛒</span>
            <span>Carrito</span>
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    header {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
  `]
})
export class HeaderComponent {
  constructor() {}
}