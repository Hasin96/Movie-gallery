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



  public getMovies(typeOfShow: string, filter: string) : Observable<TopRatedMoviesWrapper> {
    

    return this.http.get<TopRatedMovies>(`https://api.themoviedb.org/3/${typeOfShow}/${filter}?api_key='${apikey}'&language=en-GB&page=1`)
        .pipe(switchMap(movies => {
          // this.topRatedMovies = movies;
          
          // let numberToRemove: number = this.topRatedMovies.results.length - 4;
          // this.topRatedMovies.results.splice(4, numberToRemove);
      
          return this.http.get<Genre>(`https://api.themoviedb.org/3/genre/${filter}/list?api_key='${apikey}'&language=en-GB`)
            .pipe(map(genres => {
              //this.genres = data;
              
              movies.results = movies.results.filter(
                (movie: results, index: number, arr: results[]) => {
                  let genre;

                  genres.genres.filter(
                    (val) => {
                      if (val.id == movie.genre_ids[0]) {
                        genre = val;
                      }
                    }
                  )

                  arr[index].genres = genre;

                  return movie;
                }
              )

              let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
                topRatedMovies: movies,
              }

              return wrapper;
            }));
        }));
  }
}
