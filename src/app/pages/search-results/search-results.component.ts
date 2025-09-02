import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.develop';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { Movie, Person, PersonMovieCredits } from '../../../../models/Movie';
import { CommonModule } from '@angular/common';
import { MovieDatailModalComponent } from '../../movie-datail-modal/movie-datail-modal.component';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, MovieDatailModalComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute
  ) {}
  imageBaseUrl = environment.tmdbImageBaseUrl;
  movies: Movie[] = [];
  people: Person[] = [];
  query: string = ''; //è la parola chiave cercata
  tipo: string = ''; //tipo: indica il tipo di ricerca (es. "titolo", "persona", "genere")
  loading: boolean = true; //loading: serve per mostrare un caricamento mentre arrivano i dati

  selectedMovie: Movie | null = null;
  modalTop = 0;
  modalLeft = 0;

  //rappresentazione dei generi con i relativi ID ufficiali di TMDB presi dalla documentazione(api-reference/genre/movielist)
  genreMap: { [key: string]: number } = {
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

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
      this.query = params['q'];
      this.selectedMovie = null; // Chiude la modale quando cambia la query

      this.loading = true;
      //con queste 2 righe sotto svuoto le ricerche precedenti cosi che in coda non trovo altre copertine/immagini
      this.movies = [];
      this.people = [];
      if (this.tipo === 'titolo') {
        this.tmdbService.searchMovies(this.query).subscribe({
          next: (data) => {
            this.movies = data.results.filter((movie) => movie.poster_path); //solo film con immagine
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
      } else if (this.tipo === 'persona') {
        this.tmdbService.searchPeople(this.query).subscribe({
          next: (data) => {
            this.people = data.results.filter((person) => person.profile_path); //  solo persone con immagine

            if (this.people.length > 0) {
              const personId = this.people[0].id;
              this.tmdbService.getPersonMovieCredits(personId).subscribe({
                next: (credits: PersonMovieCredits) => {
                  this.movies = credits.cast.filter(
                    (movie) => movie.poster_path
                  ); //solo film con immagine
                },
                error: () => {
                  this.loading = false;
                },
              });
            } else {
              this.loading = false;
            }
          },
          error: () => {
            this.loading = false;
          },
        });
      } else if (this.tipo === 'genere') {
        const genreId = this.genreMap[this.query.toLowerCase()];
        if (genreId) {
          this.tmdbService.searchByGenre(genreId).subscribe({
            next: (data) => {
              this.movies = data.results;
              this.loading = false;
            },
            error: () => {
              this.loading = false;
            },
          });
        }
      }
    });
  }
  // onCardClick(event: MouseEvent, movie: Movie) {
  //   const target = event.currentTarget as HTMLElement;
  //   const rect = target.getBoundingClientRect();
  //   // this.modalTop = rect.top + window.scrollY;
  //   // this.modalLeft = rect.left + window.scrollX;
  //   // this.selectedMovie = movie;
  //   const modalWidth = 600; // stessa larghezza del CSS

  //   const padding = 20;

  //   let left = rect.left + window.scrollX;
  //   let top = rect.top + window.scrollY - 10;

  //   // Se la modale uscirebbe a destra, spostala a sinistra
  //   if (left + modalWidth + padding > window.innerWidth) {
  //     left = window.innerWidth - modalWidth - padding;
  //   }

  //   // Se la modale uscirebbe a sinistra, allineala al padding
  //   if (left < padding) {
  //     left = padding;
  //   }
  //   this.modalTop = top;
  //   this.modalLeft = left;
  //   this.selectedMovie = movie;
  // }
  onCardClick(event: MouseEvent, movie: Movie) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const modalWidth = 600;
    const modalHeight = 400;
    const padding = 20;

    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + padding;

    // Calcolo orizzontale
    const spaceRight = window.innerWidth - rect.left;
    const spaceLeft = rect.right;

    if (spaceRight < modalWidth + padding && spaceLeft > modalWidth + padding) {
      // Posiziona a sinistra della card
      left = rect.right + window.scrollX - modalWidth;
    }

    if (left + modalWidth + padding > window.innerWidth) {
      left = window.innerWidth - modalWidth - padding;
    }

    if (left < padding) {
      left = padding;
    }

    // Calcolo verticale
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (
      spaceBelow < modalHeight + padding &&
      spaceAbove > modalHeight + padding
    ) {
      // Posiziona sopra la card
      top = rect.top + window.scrollY - modalHeight - padding;
    }

    if (
      spaceBelow < modalHeight + padding &&
      spaceAbove < modalHeight + padding
    ) {
      // Centra verticalmente
      top = window.scrollY + window.innerHeight / 2 - modalHeight / 2;
    }

    this.modalTop = top;
    this.modalLeft = left;
    this.selectedMovie = null;
    setTimeout(() => {
      this.selectedMovie = movie;
      this.modalTop = top;
      this.modalLeft = left;
    }, 0);
  }
}
