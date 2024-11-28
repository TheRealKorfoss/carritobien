import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterInterface } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Registro</h2>
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label for="nombre">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre"
              [(ngModel)]="registerData.nombre"
              required
              #nombre="ngModel"
              class="form-control">
            <div *ngIf="nombre.invalid && (nombre.dirty || nombre.touched)" class="error-message">
              El nombre es requerido
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              [(ngModel)]="registerData.email"
              required
              email
              #email="ngModel"
              class="form-control">
            <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error-message">
              Email inválido
            </div>
          </div>

          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input 
              type="tel" 
              id="telefono" 
              name="telefono"
              [(ngModel)]="registerData.telefono"
              required
              pattern="[0-9]{9}"
              #telefono="ngModel"
              class="form-control">
            <div *ngIf="telefono.invalid && (telefono.dirty || telefono.touched)" class="error-message">
              Teléfono inválido (debe tener 9 dígitos)
            </div>
          </div>

          <div class="form-group">
            <label for="direccion">Dirección</label>
            <input 
              type="text" 
              id="direccion" 
              name="direccion"
              [(ngModel)]="registerData.direccion"
              required
              #direccion="ngModel"
              class="form-control">
            <div *ngIf="direccion.invalid && (direccion.dirty || direccion.touched)" class="error-message">
              La dirección es requerida
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              [(ngModel)]="registerData.password"
              required
              minlength="6"
              #password="ngModel"
              class="form-control">
            <div *ngIf="password.invalid && (password.dirty || password.touched)" class="error-message">
              La contraseña debe tener al menos 6 caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              [(ngModel)]="registerData.confirmPassword"
              required
              class="form-control">
            <div *ngIf="registerData.password !== registerData.confirmPassword" class="error-message">
              Las contraseñas no coinciden
            </div>
          </div>

          <button 
            type="submit" 
            [disabled]="registerForm.invalid || registerData.password !== registerData.confirmPassword" 
            class="submit-btn">
            Registrarse
          </button>

          <p class="login-link">
            ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* Contenedor principal */
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
      position: relative;
      overflow: hidden;
    }

    /* Elementos decorativos de fondo */
    .register-container::before,
    .register-container::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      z-index: 0;
    }

    .register-container::before {
      width: 300px;
      height: 300px;
      background: rgba(74, 144, 226, 0.1);
      top: -150px;
      right: -150px;
    }

    .register-container::after {
      width: 200px;
      height: 200px;
      background: rgba(74, 144, 226, 0.15);
      bottom: -100px;
      left: -100px;
    }

    /* Tarjeta de registro */
    .register-card {
      width: 100%;
      max-width: 450px;
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 1;
    }

    /* Encabezado */
    h2 {
      color: #2c3e50;
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 1.5rem;
    }

    /* Grupos de formulario */
    .form-group {
      margin-bottom: 1.5rem;
    }

    /* Etiquetas */
    label {
      display: block;
      color: #4a5568;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    /* Campos de entrada */
    .form-control {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      color: #2d3748;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }

    /* Estado de error en los campos */
    .form-control.ng-invalid.ng-touched {
      border-color: #e53e3e;
    }

    /* Mensajes de error */
    .error-message {
      color: #e53e3e;
      font-size: 0.8rem;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* Botón de envío */
    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: #4a90e2;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      background: #357abd;
      transform: translateY(-1px);
    }

    .submit-btn:disabled {
      background: #94a3b8;
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* Link de inicio de sesión */
    .login-link {
      text-align: center;
      margin-top: 1.5rem;
      color: #4a5568;
      font-size: 0.95rem;
    }

    .login-link a {
      color: #4a90e2;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .login-link a:hover {
      color: #357abd;
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .register-container {
        padding: 1rem;
      }

      .register-card {
        padding: 1.5rem;
      }

      h2 {
        font-size: 1.5rem;
      }

      .form-control {
        padding: 0.7rem 0.9rem;
      }
    }

    /* Animaciones */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .register-card {
      animation: fadeIn 0.5s ease-out;
    }
  `]
})
export class RegisterComponent {
  registerData: RegisterInterface = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      return;
    }
  
    const { confirmPassword, ...dataToSend } = this.registerData;
    console.log('Datos a enviar:', dataToSend);
  
    this.authService.register(dataToSend).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log('URL que se está llamando:', error.url);
        console.log('Estado del error:', error.status);
        console.log('Datos del error completo:', error);
      }
    });
  }
}