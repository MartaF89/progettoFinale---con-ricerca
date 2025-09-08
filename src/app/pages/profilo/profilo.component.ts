import { Component, OnInit } from '@angular/core';
import { AuthService, LoggedUser } from '../../services/auth.service';
import { TmdbService } from '../../services/tmdb.service';
import { MovieDetail } from '../../../../models/Movie';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.develop';

@Component({
  selector: 'app-profilo',
  imports: [CommonModule, RouterModule],
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css',
})
export class ProfiloComponent implements OnInit {
  user?: LoggedUser;
  favoriteMovies: MovieDetail[] = [];
  cartMovies: { movie: MovieDetail; quantity: number }[] = [];

  constructor(
    private authService: AuthService,
    private tmdbService: TmdbService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    this.loadFavoriteMovies();
    this.loadCartMovies();
  }
  //preferiti
  loadFavoriteMovies(): void {
    const ids = this.user?.favorites || [];
    const requests = ids.map((id) => this.tmdbService.getMovieDetails(+id));
    forkJoin(requests).subscribe((movies) => {
      this.favoriteMovies = movies;
    });
  }
  removeFromFavorites(id: number): void {
    if (!this.user || !this.user.favorites) return;

    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.id !== id
    );
    this.user.favorites = this.user.favorites.filter((favId) => +favId !== id);
    // 🔄 Aggiorna l user del backend
    this.http
      .put(`${environment.backendProgFin}/utenti/${this.user._id}`, this.user)
      .subscribe({
        next: () => console.log('Preferiti aggiornati'),
        error: (err) => console.error('Errore aggiornamento preferiti', err),
      });
  }
  //carrello
  loadCartMovies(): void {
    const items = this.user?.cart || [];
    const requests = items.map((item) =>
      this.tmdbService.getMovieDetails(item.movieId)
    );
    forkJoin(requests).subscribe((movies) => {
      this.cartMovies = movies.map((movie, index) => ({
        movie,
        quantity: items[index].quantity,
        price: 5.99, //prezzo fisso
      }));
    });
  }
  removeFromCart(id: number): void {
    if (!this.user || !this.user.cart) return;

    this.cartMovies = this.cartMovies.filter((item) => item.movie.id !== id);
    this.user.cart = this.user.cart.filter((item) => item.movieId !== id);
  }
}
