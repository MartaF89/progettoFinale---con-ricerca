import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContattiComponent } from './pages/contatti/contatti.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'catalogo', component: HomeComponent },
  { path: 'risultati', component: SearchResultsComponent },
];
