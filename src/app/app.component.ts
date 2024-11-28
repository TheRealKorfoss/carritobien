import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    ButtonModule, 
    InputTextModule, 
    FormsModule, 
    LoginComponent, 
    HttpClientModule
  ],
  template: `
    <nav [ngStyle]="navStyles">
      <div [ngStyle]="containerStyles">
        <div [ngStyle]="logoStyles">
          <a routerLink="/" [ngStyle]="logoLinkStyles">Mi Tienda</a>
        </div>
        
        <div [ngStyle]="menuStyles" [class.show-menu]="isMenuOpen">
          <a *ngFor="let item of menuItems" 
             [routerLink]="item.route" 
             routerLinkActive="active-link" 
             [ngStyle]="menuItemStyles">
            <i [class]="item.icon"></i>
            {{item.label}}
          </a>
        </div>

        <button [ngStyle]="menuButtonStyles" (click)="toggleMenu()" class="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    <div [ngStyle]="spacerStyles"></div>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      width: 100%;
      min-height: 100vh;
    }
    .show-menu {
      transform: translateY(0) !important;
    }
    .active-link {
      color: #007bff !important;
      background: rgba(0,123,255,0.1) !important;
    }
    .menu-toggle span {
      display: block;
      width: 25px;
      height: 3px;
      background: #333;
      margin: 4px 0;
      transition: 0.3s;
    }
    @media (max-width: 768px) {
      .menu-toggle {
        display: block !important;
      }
    }
  `]
})
export class AppComponent {
  isMenuOpen = false;

  menuItems = [
    { route: '/productos', label: 'Productos', icon: 'fas fa-store' },
    { route: '/carrito', label: 'Carrito', icon: 'fas fa-shopping-cart' },
    { route: '/pago', label: 'Pago', icon: 'fas fa-credit-card' },
    { route: '/login', label: 'Login', icon: 'fas fa-user' }
  ];

  navStyles = {
    background: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '1000'
  };

  containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px'
  };

  logoStyles = {
    fontSize: '24px',
    fontWeight: 'bold'
  };

  logoLinkStyles = {
    color: '#333',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  };

  menuStyles = {
    display: 'flex',
    gap: '20px',
    transition: 'transform 0.3s ease'
  };

  menuItemStyles = {
    color: '#666',
    textDecoration: 'none',
    padding: '10px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  menuButtonStyles = {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px'
  };

  spacerStyles = {
    height: '70px'
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          this.isMenuOpen = false;
        }
      });
    }
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      if (mediaQuery.matches) {
        Object.assign(this.menuStyles, {
          position: 'absolute',
          top: '70px',
          left: '0',
          right: '0',
          background: 'white',
          flexDirection: 'column',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transform: 'translateY(-150%)'
        });
      }
    }
  }
} 