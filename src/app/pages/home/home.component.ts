import { Component } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../../../models/Movie';
import { environment } from '../../../environments/environment.develop';
import { MovieCarouselComponent } from '../../movie-carousel/movie-carousel.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { HeroSliderComponent } from '../../components/hero-slider/hero-slider.component';
import { CommonModule } from '@angular/common';
import { MovieDatailModalComponent } from '../../movie-datail-modal/movie-datail-modal.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MovieCarouselComponent,
    InfiniteScrollDirective,
    HeroSliderComponent,
    MovieDatailModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  trending: Movie[] = [];
  topRated: Movie[] = [];
  upComing: Movie[] = [];
  nowPlaying: Movie[] = [];
  loading: boolean = true;
  error: boolean = false;
  heroMovies: Movie[] = [];
  selectedMovie: Movie | null = null;
  modalTop: number = 0;
  modalLeft: number = 0;
  showModal: boolean = false;
  currentPage = 1;
  totalPages = 1000;
  imageBaseUrl = environment.tmdbImageBaseUrl;

  constructor(private tmdbService: TmdbService) {}
  ngOnInit() {
    this.loadHeroMovies();
    this.tmdbService.getTrendingMovies().subscribe({
      next: (data) => {
        this.trending = data.results;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
    this.tmdbService.getTopRated().subscribe({
      next: (data) => {
        this.topRated = data.results;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
    this.tmdbService.getUpComing().subscribe({
      next: (data) => {
        this.upComing = data.results;
        this.loading = false;
      },
      error: () => {
        this.error = true;

        this.loading = false;
      },
    });
    this.tmdbService.getNowPlaying().subscribe({
      next: (data) => {
        this.nowPlaying = data.results;
        this.loading = false;
      },
      error: () => {
        this.error = true;

        this.loading = false;
      },
    });
  }
  loadHeroMovies() {
    if (this.currentPage > this.totalPages) return;
    this.tmdbService.getDiscoverMovies(this.currentPage).subscribe({
      next: (data) => {
        console.log('Totale pagine:', data.total_pages);
        console.log('Totale risultati:', data.total_results);
        this.heroMovies.push(...data.results);
        this.totalPages = data.total_pages;
        this.currentPage++;
      },
      error: () => {
        this.error = true;
      },
    });
  }

  openModal(movie: Movie) {
    this.selectedMovie = movie;
  }

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
