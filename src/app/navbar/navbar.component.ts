import { Component, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isScrolled = false;
  searchActive = false;
  searchControl = new FormControl('');
  selectedTipo = 'titolo';

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
  // //RICERCA, legge il testo, estrae tipo e valore, naviga con queryParams, resetta il campo e chiude la barra.
  // submitSearch() {
  //   const query = this.searchControl.value?.trim(); //legge il valore della barra di ricerca
  //   if (!query) return; //se è vuoto return
  //   let tipo = 'titolo';
  //   let valore = query;
  //   if (query.includes(':')) {
  //     const [prefix, rest] = query.split(':');
  //     tipo = prefix.toLowerCase();
  //     valore = rest.trim();
  //   }
  //   this.router.navigate(['/risultati'], {
  //     queryParams: { tipo, q: valore },
  //   });

  //   this.searchControl.reset();
  //   this.searchActive = false;
  // }

  //NUOVO SUBMIT PER RICERCA ESTESA
  submitSearch() {
    const query = this.searchControl.value?.trim();
    if (!query) return;

    const genreMap: { [key: string]: number } = {
      azione: 28,
      avventura: 12,
      animazione: 16,
      commedia: 35,
      crimine: 80,
      documentario: 99,
      dramma: 18,
      famiglia: 10751,
      fantasy: 14,
      storia: 36,
      horror: 27,
      musica: 10402,
      mistero: 9648,
      romantico: 10749,
      fantascienza: 878,
      thriller: 53,
      guerra: 10752,
      western: 37,
    };

    let tipo = 'titolo';
    let valore = query;

    // Se l'utente usa il formato tipo:valore
    if (query.includes(':')) {
      const [prefix, rest] = query.split(':');
      tipo = prefix.toLowerCase();
      valore = rest.trim();
    } else {
      // Altrimenti cerchiamo di capire se è un genere
      const lowerQuery = query.toLowerCase();
      if (genreMap[lowerQuery]) {
        tipo = 'genere';
        valore = lowerQuery;
      } else if (query.split(' ').length >= 2) {
        // Se ci sono almeno due parole, probabilmente è una persona
        tipo = 'persona';
        valore = query;
      } else {
        tipo = 'titolo';
        valore = query;
      }
    }

    this.router.navigate(['/risultati'], {
      queryParams: { tipo, q: valore },
    });

    this.searchControl.reset();
    this.searchActive = false;
  }

  // apre la barra di ricerca al primo click, invia la ricerca al secondo.
  toggleSearch() {
    if (!this.searchActive) {
      this.searchActive = true;
      return;
    }
    this.submitSearch();
  }
  getPlaceholder(): string {
    const value = this.searchControl.value?.trim() || '';
    if (!value) return 'Film,Genere,Persona';

    const genreMap = ['azione', 'commedia', 'dramma', 'horror', 'fantascienza'];
    const lowerValue = value.toLowerCase(); //trasforma il contenuto digitato in minuscolo

    if (genreMap.includes(lowerValue)) return 'Cerca un genere...'; //se è un genere noto cerca
    if (value.split(' ').length >= 2) return 'Cerca una persona...'; // se contiene almeno 2 parole cerca in persona
    return 'Cerca un titolo...'; // altrimenti cerca un titolo
  }
}
