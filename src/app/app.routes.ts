import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { DetailsHeroSliderComponent } from './pages/details-hero-slider/details-hero-slider.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'contatti', component: ContattiComponent },
//   { path: 'catalogo', component: HomeComponent },
//   { path: 'risultati', component: SearchResultsComponent },
//   { path: 'movie/:id', component: DetailsHeroSliderComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: '', redirectTo: '/register', pathMatch: 'full' },
// ];
export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'catalogo', component: HomeComponent },
  { path: 'risultati', component: SearchResultsComponent },
  { path: 'movie/:id', component: DetailsHeroSliderComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }, // solo questa per path vuoto
];
