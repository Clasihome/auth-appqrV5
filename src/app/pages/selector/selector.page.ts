import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de importar AuthService

@Component({
  selector: 'app-selector',
  templateUrl: './selector.page.html',
  styleUrls: ['./selector.page.scss'],
})
export class SelectorPage implements OnInit {
  componente = {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo_DuocUC.svg/711px-Logo_DuocUC.svg.png"
  };

  constructor(private router: Router, private authService: AuthService) { } // Inyecta Router y AuthService

  ngOnInit() {}

  navigateToScan() {
    this.router.navigate(['/scan']); // Navega a la página de Scan
  }

  navigateToCreateClass() {
    this.router.navigate(['/create-class']); // Navega a la página de Create Class
  }

  navigateToRickyMory() {
    this.router.navigate(['/rickymorty']); // Navega a la página de Ricky y Morty API
  }
  
  async logout() {
    try {
      await this.authService.logout(); // Llama al método logout en AuthService
      alert("Sesión cerrada exitosamente");
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Hubo un problema al cerrar la sesión.");
    }
  }
}