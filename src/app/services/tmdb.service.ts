import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.develop';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import {
  CreditsResponse,
  GenreResponse,
  MovieDetail,
  MovieResponse,
  PersonMovieCredits,
  PersonResponse,
  SimilarMoviesResponse,
  VideosResponse,
} from '../../../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey = environment.tmdbApiKey;
  private tmdbUrl = environment.tmdbUrl;
  constructor(private http: HttpClient) {}
  //CHIAMATA PER OTTENERE I FILM DI TENDENZA
  getTrendingMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.tmdbUrl}/3/trending/movie/week?api_key=${this.apiKey}`
    );
  }
  //CHIAMATA PER I FILM CON LE VALUTAZIONI PIU ALTE
  getTopRated(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.tmdbUrl}/3/movie/top_rated?api_key=${this.apiKey}`
    );
  }
  //CHIAMATA PER OTTENERE I FILM IN USCUTA
  getUpComing(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.tmdbUrl}/3/movie/upcoming?api_key=${this.apiKey}`
    );
  }
  //ADESSO IN PROGRAMMAZIONE
  getNowPlaying(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.tmdbUrl}/3/movie/now_playing?api_key=${this.apiKey}`
    );
  }
  //FILM TUTTI, accetta numeri di pagina e restituisce film corrispondenti
  getDiscoverMovies(page: number = 1) {
    return this.http.get<MovieResponse>(
      `${environment.tmdbUrl}/3/discover/movie?api_key=${environment.tmdbApiKey}&page=${page}`
    );
  }
  //dettaglio
  getMovieDetails(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.tmdbUrl}/3/movie/${id}?api_key=${this.apiKey}&language=it-IT`
    );
  }
  //cast e crew
  getMovieCredits(id: number): Observable<CreditsResponse> {
    return this.http.get<CreditsResponse>(
      `${this.tmdbUrl}/3/movie/${id}/credits?api_key=${this.apiKey}&language=it-IT`
    );
  }
  //film simili
  getSimilarMovies(id: number): Observable<SimilarMoviesResponse> {
    return this.http.get<SimilarMoviesResponse>(
      `${this.tmdbUrl}/3/movie/${id}/similar?api_key=${this.apiKey}&language=it-IT`
    );
  }
  //video
  getVideos(id: number): Observable<VideosResponse> {
    return this.http.get<VideosResponse>(
      `${this.tmdbUrl}/3/movie/${id}/videos?api_key=${this.apiKey}&language=it-IT`
    );
  }
  //usando forkJoin di RxJS riunisco piu chiamate in una sola, utile per la modale
  getFullMovieData(id: number): Observable<{
    details: MovieDetail;
    credits: CreditsResponse;
    similar: SimilarMoviesResponse;
    videos: VideosResponse;
  }> {
    return forkJoin({
      details: this.getMovieDetails(id),
      credits: this.getMovieCredits(id),
      similar: this.getSimilarMovies(id),
      videos: this.getVideos(id),
    });
  }

  //CHIAMATA PER LA RICERCA encodeURIComponent(query) è importante per gestire spazi e caratteri speciali.
  searchMovies(query: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.tmdbUrl}/3/search/movie?api_key=${
        this.apiKey
      }&query=${encodeURIComponent(query)}&language=it-IT`
    );
  }

  //QUESTE RICHIESTE FUNZIONANO SOLO SE COMPONGO L URL DIRETTAMENTE NELLA BARRA DI RICERCA DEL BROWSRER
  searchPeople(query: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(
      `${this.tmdbUrl}/3/search/person?api_key=${
        this.apiKey
      }&query=${encodeURIComponent(query)}&language=it-IT`
    );
  }
  getPersonMovieCredits(personId: number): Observable<PersonMovieCredits> {
    return this.http.get<PersonMovieCredits>(
      `${this.tmdbUrl}/3/person/${personId}/movie_credits?api_key=${this.apiKey}&language=it-IT`
    );
  }

  getGenres(): Observable<GenreResponse> {
    return this.http.get<GenreResponse>(
      `${this.tmdbUrl}/3/genre/movie/list?api_key=${this.apiKey}&language=it-IT`
    );
  }

  searchByGenre(genreId: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.tmdbUrl}/3/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=it-IT`
    );
  }
}
