import { Pipe, PipeTransform } from '@angular/core';
import { CreditsResponse, Genre, Video } from '../../../models/Movie';

@Pipe({
  name: 'genreList',
})
export class GenreListPipe implements PipeTransform {
  transform(genres: Genre[] | undefined): string {
    return genres?.map((g) => g.name).join(', ') || '';
  }
}
@Pipe({
  name: 'trailer',
})
//questa pipe cerca nel videos[] il primo video type===trailer e che proviene da
//site===youtube e ne restituisce la key(identificatore univoco del video)
export class TrailerPipe implements PipeTransform {
  transform(videos: Video[] | undefined): string {
    return (
      videos?.find(
        (v) => v.type === 'Trailer' && v.site.toLowerCase() === 'youtube'
      )?.key || ''
    );
  }
}
@Pipe({
  name: 'director',
})
export class DirectorPipe implements PipeTransform {
  transform(credits: CreditsResponse | undefined): string {
    return (
      credits?.crew.find(
        (person) => person.job.toLowerCase().includes('director') //con include intercetto anche variazioni tipo "second unit director, Director, Assistant Director"
      )?.name || ''
    );
  }
}
@Pipe({
  name: 'cast',
})
export class CastPipe implements PipeTransform {
  transform(credits: CreditsResponse | undefined, count: number = 3): string {
    return (
      credits?.cast //accede all’array degli attori, se esiste.
        .slice(0, count) //prende solo i primi count(3) attori.
        .map((actor) => actor.name) //estrae solo i nomi.
        .join(', ') || '' //li unisce in una stringa separata da virgole. ||''fallback in caso di dati mancanti.
    );
  }
}
