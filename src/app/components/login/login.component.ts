import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta según tu estructura
import { LoginInterface, LoginBackendInterface } from '../../interfaces/auth.interface';
import { CommonModule } from '@angular/common';  // Añadido
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const frontendData: LoginInterface = this.loginForm.value;
      
      const backendData: LoginBackendInterface = {
        email: frontendData.email,
        contrasena: frontendData.password // Asegúrate que esto coincida con lo que espera tu backend
      };

      console.log('Enviando datos al backend:', backendData);
      
      this.authService.login(backendData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.success) {
            localStorage.setItem('token', response.token);
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Login exitoso'
            });
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Error detallado:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Error al iniciar sesión'
          });
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, complete todos los campos correctamente'
      });
    }
  }
}