import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-selector',
  templateUrl: './selector.page.html',
  styleUrls: ['./selector.page.scss'],
})
  

export class SelectorPage implements OnInit {

  componente = {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo_DuocUC.svg/711px-Logo_DuocUC.svg.png"
  };





  constructor(private router: Router) { } // Inyecta Router

  ngOnInit() {
  }

  navigateToScan() {
    this.router.navigate(['/scan']); // Navega a la página de Scan
  }

  navigateToCreateClass() {
    this.router.navigate(['/create-class']); // Navega a la página de Create Class
  }

  navigateToRickyMory() {
    this.router.navigate(['/rickymorty']); // Navega a la página de Scan
  }
  
}