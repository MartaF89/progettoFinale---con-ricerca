import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CreditsResponse,
  Movie,
  MovieDetail,
  SimilarMoviesResponse,
  Video,
} from '../../../models/Movie';
import { TmdbService } from '../services/tmdb.service';
import { environment } from '../../environments/environment.develop';
import {
  CastPipe,
  DirectorPipe,
  GenreListPipe,
  TrailerPipe,
} from '../pipes/custom.pipe';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarrelloComponent } from '../components/carrello/carrello.component';
import { LoggedUser } from '../services/auth.service';

@Component({
  selector: 'app-movie-datail-modal',
  imports: [
    GenreListPipe,
    DirectorPipe,
    CommonModule,
    CastPipe,
    CarrelloComponent,
  ],
  templateUrl: './movie-datail-modal.component.html',
  styleUrl: './movie-datail-modal.component.css',
})
export class MovieDatailModalComponent {
  @Input() movie!: Movie;
  @Input() movieId!: number;
  @Output() close = new EventEmitter<void>();
  @Input() loggedUser!: LoggedUser;
  safeTrailerUrl?: SafeResourceUrl;

  //Serve per evitare chiamate API ripetute: una volta caricati i dati completi, non li ricarica.
  fullDataLoaded = false;
  //Questi sono i dati arricchiti del film:
  details!: MovieDetail;
  credits!: CreditsResponse;
  similar!: SimilarMoviesResponse;
  imageBaseUrl: string = environment.tmdbImageBaseUrl;
  youtubeBaseUrl = environment.youtubeEmbedBaseUrl;

  constructor(
    private tmdbService: TmdbService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    console.log('Utente ricevuto:', this.loggedUser);
    console.log('Modale inizializzata per:', this.movie?.title);
    if (!this.fullDataLoaded && this.movie?.id) {
      this.tmdbService.getFullMovieData(this.movie.id).subscribe((data) => {
        this.details = {
          ...data.details,
          videos: data.videos,
        };
        this.credits = data.credits;
        this.similar = data.similar;

        const trailerKey = data.videos.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        )?.key;

        if (trailerKey) {
          this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.youtubeBaseUrl + trailerKey
          );
        }

        this.fullDataLoaded = true;
      });
    }
  }
  trackByUnique(index: number, item: any): string {
    return `${item.id}-${index}`; // combina id e index per evitare duplicati
  }
}
