export const environment = {
  backendProgFin: 'http://localhost:3000',
  production: false,
  jsonServerUrl: 'http://localhost:3000',
  tmdbUrl: 'https://api.themoviedb.org',
  tmdbApiKey: '452e9c3bdf83daa533c8503d7a5aa6bb',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500',
  youtubeEmbedBaseUrl: 'https://www.youtube.com/embed/',
  tmdbImageBannerBaseUrl: 'https://image.tmdb.org/t/p/original/',
};
// https://image.tmdb.org → è il dominio del server immagini di TMDB, preso dalla documentazione

// /t/p/ → è il percorso per accedere ai poster e immagini

// w500 → indica la larghezza dell’immagine (500 pixel)

// movie.poster_path → è la parte finale del percorso, che cambia per ogni film
//PRO => Se vuoi cambiare la dimensione (w300, original, ecc.), lo fai in un solo punto

//per avere l informazione vai su doc tmdb configuration detail e testa la chiamata da li
