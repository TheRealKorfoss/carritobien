export interface LoginInterface {
    email: string;
    password: string;
  }
  
  export interface RegisterInterface {
    id?: number;  // opcional porque se genera automáticamente
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    password: string;
    confirmPassword?: string; // opcional porque no se guarda en BD
  }

  export interface LoginBackendInterface {
    email: string;
    contrasena: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user?: {
    id: number;
    nombre: string;
    email: string;
    rol: string;
  };
  message?: string;
}