import { Component, Inject } from '@angular/core';
import {
  Router,
  RouterModule,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { ContattiComponent } from './pages/contatti/contatti.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ProgettoFinale';
  showLayout = true;

  constructor(
    private router: Router,
    // Angular, per default, mantiene la posizione dello scroll quando si naviga tra route, così forzo lo scroll in alto ogni volta che cambio route.
    private viewportScroller: ViewportScroller
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);

        // Nasconde navbar e footer se siamo in login o register
        const hiddenRoutes = ['/login', '/register'];
        // this.showLayout = !hiddenRoutes.includes(event.url);
        const currentUrl = event.urlAfterRedirects;
        this.showLayout = !hiddenRoutes.some((route) =>
          currentUrl.startsWith(route)
        );
      }
    });
  }
}
