import { Component, Input } from '@angular/core';
import {
  CreditsResponse,
  Movie,
  MovieDetail,
  SimilarMoviesResponse,
} from '../../../../models/Movie';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { environment } from '../../../environments/environment.develop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-hero-slider',
  imports: [CommonModule],
  templateUrl: './details-hero-slider.component.html',
  styleUrl: './details-hero-slider.component.css',
})
export class DetailsHeroSliderComponent {
  safeTrailerUrl?: SafeResourceUrl;
  showTrailer = false;
  //Serve per evitare chiamate API ripetute: una volta caricati i dati completi, non li ricarica.
  fullDataLoaded = false;
  //Questi sono i dati arricchiti del film:
  details!: MovieDetail;
  credits!: CreditsResponse;
  similar!: SimilarMoviesResponse;
  imageBaseUrl: string = environment.tmdbImageBannerBaseUrl;
  youtubeBaseUrl = environment.youtubeEmbedBaseUrl;

  constructor(
    private tmdbService: TmdbService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    if (!this.fullDataLoaded) {
      this.tmdbService.getFullMovieData(id).subscribe((data) => {
        this.details = {
          ...data.details,
          videos: data.videos,
        };
        this.credits = data.credits;
        this.similar = data.similar;

        const trailerKey = data.videos.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        )?.key;

        if (trailerKey) {
          this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.youtubeBaseUrl + trailerKey
          );
        }

        this.fullDataLoaded = true;
      });
    }
  }
}
