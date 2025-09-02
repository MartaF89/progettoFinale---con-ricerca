//PROPRIETà DEL FIM CHE MI INTERESSANO.non ho usato tutte le proprietà, ma solo quelle essenziali per mostrare il film in modo intuitivo

//e non appesantirlo con  dettagli tecnici
export interface Movie {
  id: number;
  title: string;
  overview: string; //breve descrizione
  poster_path: string; //immagine
  backdrop_path: string; //per l immagine originale mi serve per l hero banner
  release_date: string; //data uscita
  vote_average: number; // valutazione
}
//RISPOSTA COMPLETA DELL'API,con proprietà aggiuntive
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number; // durata in minuti
  tagline: string; // frase promozionale
  director?: string;
  trailerUrl?: string;
  videos?: VideosResponse;
}
export interface SimilarMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}
//usa l’endpoint:/movie/{movie_id}/credits Serve per:
// Ottenere il cast e la crew di un singolo film.
// Mostrare chi ha recitato, diretto, scritto, ecc.
export interface CreditsResponse {
  cast: CastMember[]; //attori
  crew: CrewMember[]; //registi sceneggiatori ecc
}
//usa l endpoint:/person/{person_id}/movie_credits, Serve per:
// Ottenere tutti i film in cui una persona ha lavorato.
// Può includere sia ruoli da attore (cast) che da regista o altro (crew).
export interface PersonMovieCredits {
  cast: Movie[]; //dove ha recitato
  crew: Movie[]; //dove ha lavorato come membro della crew
}
export interface Genre {
  id: number;
  name: string;
}
export interface GenreResponse {
  genres: Genre[];
}
export interface Video {
  id: string;
  key: string; // codice del video su YouTube
  name: string; // titolo del video
  site: string; // es. "YouTube"
  type: string; // es. "Trailer", "Teaser"
}

export interface VideosResponse {
  id: number;
  results: Video[];
}
export interface Person {
  id: number;
  name: string;
  profile_path: string; // immagine della persona
  known_for: Movie[]; // film per cui è conosciuto
  popularity: number; // punteggio di popolarità
}
export interface PersonResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}
