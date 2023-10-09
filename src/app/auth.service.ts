import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private apiUrl = 'http://159.65.96.86:8080/services/auth/signin';

  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }


  login( password: string, username: string): Observable<boolean> {
    const body = { password, username };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError(error => {
        console.error('Error de autenticación:', error);
        return throwError('Error de autenticación. Verifica tus credenciales.');
      }),
      map(response => {
        if (response && response.accessToken) {
          // Almacenar el token de acceso
          this.setAccessToken(response.accessToken);
          return true;  // Devolver true si la autenticación fue exitosa
        } else {
          return false;  // Devolver false si la autenticación falló
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  // Método para obtener el estado de autenticación
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
