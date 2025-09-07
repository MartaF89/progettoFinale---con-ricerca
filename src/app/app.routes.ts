import { Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { DetailsHeroSliderComponent } from './pages/details-hero-slider/details-hero-slider.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'risultati', component: SearchResultsComponent },
  { path: 'movie/:id', component: DetailsHeroSliderComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // solo questa per path vuoto
];

//DA SCOMMENTARE E SOSTITUIRE A QUELLO SOPRA UNA VOLTA CREATO CATALOGOCOMPONENT E GUARD
// export const routes: Routes = [
//   { path: '', redirectTo: 'register', pathMatch: 'full' }, // schermata iniziale
// { path: 'register', component: RegisterComponent },
// { path: 'login', component: LoginComponent },
// { path: 'home', component: HomeComponent, canActivate: [authGuard] },
// { path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard] },
// { path: 'contatti', component: ContattiComponent },
// ]
