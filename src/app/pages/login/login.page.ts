import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private navCtrl: NavController) {}

  // Método para manejar el inicio de sesión
  onLogin() {
    console.log("Iniciar sesión");
    // Lógica de inicio de sesión o redirección aquí
    // Por ejemplo: this.authService.login(...);
  }

  // Método para manejar el registro
  onSignUp() {
    console.log("Crear cuenta");
    // Lógica de registro o redirección aquí
    // Por ejemplo: this.navCtrl.navigateForward('/signup');
  }
}