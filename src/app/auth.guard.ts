import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getIsLoggedIn()) {
      return true;  // Permitir acceso al dashboard si está autenticado
    }

    this.router.navigate(['/login']);  // Redirigir al inicio de sesión si no está autenticado
    return false;
  }
}
