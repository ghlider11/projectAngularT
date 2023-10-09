import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Asegúrate de importar Router de '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }  // Inyecta Router aquí


  onLogin(): void {
    const { username, password } = this.loginForm.value;


    this.authService.login(password, username).subscribe(
      success => {
        if (success) {
          console.log('Inicio de sesión exitoso para el usuario:', username);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Inicio de sesión fallido. Verifica tus credenciales.');

        }
      },
      error => {
        console.error('Error de autenticación:', error);

      }
    );
  }

}
