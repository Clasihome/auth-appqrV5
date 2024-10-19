import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-volver-boton',
  templateUrl: './volver-boton.component.html',
  styleUrls: ['./volver-boton.component.scss'],
  standalone: true, // Marcamos el componente como independiente
})
export class VolverBotonComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back(); // Navega a la página anterior en el historial
  }
}
