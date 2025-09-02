import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Movie } from '../../../models/Movie';
import { environment } from '../../environments/environment.develop';
import { MovieDatailModalComponent } from '../movie-datail-modal/movie-datail-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
})
export class MovieCarouselComponent {
  @Input() title!: string; //proprieta ereditata dal genitore home component tramite PROPRIERTY BINDING,
  //[title] è il binding.
  // 'Film Di Tendenza' è il valore che sto passando.
  // title è la proprietà del componente figlio (@Input()).
  @Input() movies: Movie[] = [];
  // @Output() openModal = new EventEmitter<Movie>();

  @Output() openModal = new EventEmitter<{ event: MouseEvent; movie: Movie }>();

  imageBaseUrl: string = environment.tmdbImageBaseUrl;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && this.movies) {
      this.movies = this.movies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
      );
    }
  }
  // onClick(movie: Movie): void {
  //   this.openModal.emit(movie);
  // }
  handleClick(event: MouseEvent, movie: Movie) {
    this.openModal.emit({ event, movie });
  }
}
