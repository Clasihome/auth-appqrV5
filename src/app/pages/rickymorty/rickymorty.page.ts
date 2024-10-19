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
  totalPages: number = 1;
  zoomedCharacterId: number | null = null;

  constructor(
    private rickymortyService: RickymortyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  viewCharacterDetail(id: number) {
    if (this.zoomedCharacterId === id) {
      this.router.navigate(['/character-detail', id]);
    } else {
      this.zoomedCharacterId = id;
      setTimeout(() => {
        this.router.navigate(['/character-detail', id]);
        this.zoomedCharacterId = null;
      }, 300);
    }
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

  // Método para obtener el rango de páginas a mostrar siempre centrado en la página actual
  getVisiblePages(): number[] {
    const pagesToShow = 5; // Número de páginas visibles
    let startPage = Math.max(1, this.currentPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  }

  // Método para cambiar directamente a una página específica
  goToPage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCharacters();
    }
  }
}