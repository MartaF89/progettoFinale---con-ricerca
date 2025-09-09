import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.develop';
import { HttpClient } from '@angular/common/http';
import { LoggedUser } from '../../services/auth.service';
import { Movie } from '../../../../models/Movie';

@Component({
  selector: 'app-carrello',
  imports: [],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css',
})
export class CarrelloComponent {
  @Input() movieId!: number;
  @Input() user!: LoggedUser;
  @Input() movie!: Movie;
  constructor(private http: HttpClient) {}

  addToFavorites(): void {
    if (!this.user.favorites) this.user.favorites = [];
    const idStr = this.movieId.toString();
    if (!this.user.favorites.includes(idStr)) {
      this.user.favorites.push(idStr);
      this.http
        .put(`${environment.backendProgFin}/utenti/${this.user._id}`, this.user)
        .subscribe();
    }
  }
  addToCart(): void {
    if (!this.user) {
      console.warn('Utente non definito, impossibile aggiungere al carrello');
      return;
    }

    if (!this.user.cart) this.user.cart = [];

    const id = this.movieId;
    const existing = this.user.cart.find((item) => item.movieId === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.user.cart.push({
        movieId: this.movie.id,
        quantity: 1,
        price: 5.99,
        poster_path: this.movie.poster_path,
        title: this.movie.title,
      });
    }

    this.http
      .put(`${environment.backendProgFin}/utenti/${this.user._id}`, this.user)
      .subscribe({
        next: () => console.log('Carrello aggiornato'),
        error: (err) => console.error('Errore aggiornamento:', err),
      });
  }
}
