import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  email: string = "";
  password: string = "";

  componente = {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo_DuocUC.svg/711px-Logo_DuocUC.svg.png"
  };



  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  async login() {
    if (this.email.trim() === "" || this.password.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    try { 
      await this.authService.login(this.email, this.password);
      alert("Logeado exitosamente");
      this.router.navigate(['/selector']);
    } catch (error) {
      alert("Error en el inicio de sesión: " + this.getErrorMessage(error));
      console.error("Error en el login:", error);
    }
  }

  async register() {
    if (this.email.trim() === "" || this.password.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    try { 
      await this.authService.register(this.email, this.password);
      alert("Registrado exitosamente: " + this.email);
    } catch (error) {
      alert("Error en el registro: " + this.getErrorMessage(error));
      console.error("Problemas al registrar usuario:", error);
    }
  }

  private getErrorMessage(error: any): string {
    // Maneja diferentes tipos de errores que puedas recibir
    if (error.code === 'auth/user-not-found') {
      return "Usuario no encontrado.";
    } else if (error.code === 'auth/wrong-password') {
      return "Contraseña incorrecta.";
    } else if (error.code === 'auth/email-already-in-use') {
      return "El correo ya está registrado.";
    } else if (error.code === 'auth/invalid-email') {
      return "El correo no es válido.";
    } else {
      return "Ocurrió un error. Inténtalo nuevamente.";
    }
  }
}