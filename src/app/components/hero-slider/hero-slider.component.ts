import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../../../models/Movie';

@Component({
  selector: 'app-hero-slider',

  imports: [CommonModule],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css'],
})
export class HeroSliderComponent {
  @Input() movies: Movie[] = [];
  imageBaseUrl = 'https://image.tmdb.org/t/p/original'; //uso l immagine originale non compressa perche si vede meglio
  @ViewChild('slider') slider!: ElementRef;
  activeIndex = 0;

  constructor(private router: Router) {}
  ngOnInit() {
    // setInterval(() => {
    //   this.activeIndex = (this.activeIndex + 1) % 10;
    //   this.scrollToSlide(this.activeIndex);
    // }, 5000);
    const autoplay = setInterval(() => {
      if (this.activeIndex < 9) {
        this.activeIndex++;
        this.scrollToSlide(this.activeIndex);
      } else {
        clearInterval(autoplay); // Ferma lo scorrimento alla decima slide
      }
    }, 8000);
  }
  scrollToSlide(index: number) {
    const sliderEl = this.slider.nativeElement;
    const slideWidth = sliderEl.offsetWidth;
    sliderEl.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });
    this.activeIndex = index;
  }
  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }
  setActive(index: number) {
    this.activeIndex = index;
    document
      .getElementById(`slide-${index}`)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
  // mostra sempre le 10 uscite più recenti
  get recentMovies() {
    return this.movies
      .slice()
      .sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      )
      .slice(0, 10);
  }
}
