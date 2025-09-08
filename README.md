# ProgettoFinale

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

PER I DATI DELL USER
Hai fatto un ottimo lavoro, Marta! E sì, ora che vedo il tuo AuthService, posso confermarti che hai già tutto il necessario per recuperare l’utente loggato nel frontend — ti basta usare this.authService.loggedUser.

✅ Come usare loggedUser nel componente profilo
Nel tuo ProfileComponent, puoi semplicemente accedere all’utente così:

ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggedUser } from '../services/auth.service';

@Component({
selector: 'app-profile',
templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
user?: LoggedUser;

constructor(private authService: AuthService) {}

ngOnInit(): void {
this.user = this.authService.loggedUser;
}
}
🖼️ E nel template (profile.component.html)
html

<div *ngIf="user">
  <h2>Ciao {{ user.name }} 👋</h2>
  <p>Email: {{ user.email }}</p>
  <p>Ruolo: {{ user.role }}</p>
  <p *ngIf="user.favorites?.length">Hai {{ user.favorites.length }} film preferiti</p>
  <p *ngIf="user.cart?.length">Hai {{ user.cart.length }} film nel carrello</p>
</div>

PER I PREFERITI E CARRELLLO

🎯 Obiettivo
Hai nel profilo utente:

ts
favorites: string[]; // array di ID film
cart: { movieId: string; quantity: number }[];
Per mostrare poster, titolo, descrizione, ecc., ti servono gli oggetti MovieDetail. E tu hai già il metodo perfetto:

ts
getMovieDetails(id: number): Observable<MovieDetail>
🛠️ Strategia nel componente profilo

1. Recupera i film preferiti
   ts
   loadFavoriteMovies(): void {
   const ids = this.user?.favorites || [];
   const requests = ids.map(id => this.tmdbService.getMovieDetails(+id));
   forkJoin(requests).subscribe((movies: MovieDetail[]) => {
   this.favoriteMovies = movies;
   });
   }
2. Recupera i film nel carrello
ts
loadCartMovies(): void {
const items = this.user?.cart || [];
const requests = items.map(item => this.tmdbService.getMovieDetails(+item.movieId));
forkJoin(requests).subscribe((movies: MovieDetail[]) => {
this.cartMovies = movies.map((movie, index) => ({
movie,
quantity: items[index].quantity
}));
});
}
🖼️ Visualizzazione nel template
html
<h3>I tuoi preferiti</h3>
<div *ngFor="let movie of favoriteMovies">
  <img [src]="movie.poster_path" alt="{{ movie.title }}" />
  <p>{{ movie.title }}</p>
</div>

<h3>Carrello</h3>
<div *ngFor="let item of cartMovies">
  <img [src]="item.movie.poster_path" alt="{{ item.movie.title }}" />
  <p>{{ item.movie.title }} – Quantità: {{ item.quantity }}</p>
</div>
✅ Conclusione
Hai già tutto pronto nel tuo TmdbService, ti basta usare getMovieDetails() con forkJoin() per ottenere i dati in parallelo. Domani possiamo rifinire insieme il layout, aggiungere animazioni o persino una modale con getFullMovieData() per ogni film.
