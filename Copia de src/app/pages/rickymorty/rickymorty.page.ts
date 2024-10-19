import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RickymortyService } from 'src/app/services/rickymorty.service';

@Component({
  selector: 'app-rickymorty',
  templateUrl: './rickymorty.page.html',
  styleUrls: ['./rickymorty.page.scss'],
})
export class RickymortyPage implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1; // Inicialización para evitar el error TS2564

  constructor(
    private rickymortyService: RickymortyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.rickymortyService.getPersonaje(this.currentPage).subscribe(
      (response) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
      },
      (error) => {
        console.error('Error fetching characters:', error);
      }
    );
  }

  viewCharacterDetail(id: number) {
    this.router.navigate(['/character-detail', id]);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }
}
