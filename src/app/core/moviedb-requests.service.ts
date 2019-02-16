import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { TopRatedMovies, results } from '../models/top-rated-movies';
import { Subscription, BehaviorSubject, Observable, of } from 'rxjs';

// apikey
import { apikey } from '../../environments/movieApiKey';

import { map, switchMap } from 'rxjs/operators';
import { Genre } from '../models/genres';


export interface TopRatedMoviesWrapper {
  topRatedMovies: TopRatedMovies,
  base_url: string,
  size: string
}

@Injectable({
  providedIn: 'root'
})
export class MoviedbRequestsService {
  

  constructor(private http: HttpClient,
             ) {
                
              }



  public getMovies(url: string, genreUrl: string): Observable<TopRatedMovies> {
    return this.http.get<TopRatedMovies>(url)
      .pipe(switchMap(movies => {
        return this.http.get<Genre>(genreUrl)
          .pipe(map(genres => {
            movies.results = movies.results.filter(
              (movie: results, index: number, arr: results[]) => {
                //let genreId: number = movie.genre_ids[0];
                let genre = [];

                genres.genres.filter(
                  (val) => {
                    // if (val.id == genreId) {
                    //   genre = val;
                    // }
                    for (let i = 0; i < movie.genre_ids.length; i++) {
                      if (val.id == movie.genre_ids[i]) {
                        genre.push(val);
                      }
                    }
                  }
                )
                arr[index].genres = genre;
                  return movie
              }
            )

            return movies;
          }));
      }));
  }
}
