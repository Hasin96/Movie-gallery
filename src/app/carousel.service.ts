import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { configuration } from '../config/config';

// models
import { TopRatedMovies, results } from './models/top-rated-movies';
import { Subscription, ReplaySubject, Observable, of } from 'rxjs';

// apikey
import { apikey } from '../environments/movieApiKey';

// commons service
import { CommonService } from './common.service';
import { map, switchMap } from 'rxjs/operators';
import { Genre } from './models/genres';
import { GenerateBaseOptions } from 'rxjs/internal/observable/generate';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzg2ZDUzZjg2OGE3ZWZlZmUwYjdmNmNhMGJjODcyYyIsInN1YiI6IjVjMzY2OWJkMGUwYTI2NWE4YjdjZGVlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AJZKgZZf2ZrsWL6UX6YjL5Vsqz7UBi4VQ1w_vcyDwkU'
  })
}

export interface TopRatedMoviesWrapper {
  topRatedMovies: TopRatedMovies,
  base_url: string,
  size: string
}


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  private CLASS_NAME = "TokenInterceptorService";

  private genreURL: string = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+apikey+'&language=en-GB';
  private url: string = 'https://api.themoviedb.org/3/movie/upcoming?api_key='+apikey+'&language=en-GB&page=1'
  private movieUrl:string = "https://api.themoviedb.org/3/search/movie?api_key="+apikey+"&language=en-US&page=1&include_adult=false&query=";
  private popularMoviesUrl: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
  private trendingMoviesUrl: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
  private popularTvShowsURL: string = `https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=en-US&page=1`

  private topRatedMovies: TopRatedMovies;
  private topRatedMoviesTest: TopRatedMovies;
  private genresTest;
  // for genre
  private genres;

  // popular movies
  private popularMovies: TopRatedMovies;

  // trending movies
  private trendingMovies: TopRatedMovies;

  // popular tv shows
  private popularTvShows: TopRatedMovies;

  // SUBJECT
  private subTopRatedMovies: Subscription;

  // REPLAY SUBJECT
  private subject: ReplaySubject<TopRatedMoviesWrapper>;

  // apikey
  private apikey: string = apikey;

  constructor(private http: HttpClient,
              private config: configuration,
              private common: CommonService
              ) { }

  public getMovies() : Observable<TopRatedMoviesWrapper> {

    return this.http.get<TopRatedMovies>(this.url)
        .pipe(switchMap(movies => {
          this.topRatedMovies = movies;
          
          let numberToRemove: number = this.topRatedMovies.results.length - 4;
          this.topRatedMovies.results.splice(4, numberToRemove);
      
          return this.http.get<Genre>(this.genreURL)
            .pipe(map(data => {
              this.genres = data;
              
              this.topRatedMovies.results = this.topRatedMovies.results.filter(
                (movie: results, index: number, arr: results[]) => {
                  let genreId: number = movie.genre_ids[0];
                  let genre;

                  this.genres.genres.filter(
                    (val) => {
                      if (val.id == genreId) {
                        genre = val;
                      }
                    }
                  )
                  arr[index].genres = genre;
                  return movie;
                }
              )

              let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
                topRatedMovies: this.topRatedMovies,
                size: this.config.config.images.backdrop_sizes[3],
                base_url: this.config.config.images.secure_base_url
              }

              return wrapper;
            }));
        }));
  }

  getMovieById(id: string) : results[] { 
    let movie = this.topRatedMovies.results.filter(
      (movie: results) => {
        return movie.id.toString() == id;
      }
    )

    return movie;
  }

  getMoviesBySearch(term: string): Observable<TopRatedMoviesWrapper> {
    //return this.http.get("https://api.themoviedb.org/3/search/multi?api_key=cc86d53f868a7efefe0b7f6ca0bc872c&query=" + term);
    //return this.http.get("https://api.themoviedb.org/3/search/keyword?api_key=cc86d53f868a7efefe0b7f6ca0bc872c&page=1&query=" + term);
    return this.http.get<TopRatedMovies>(this.movieUrl + term)
        .pipe(switchMap(movies => {
          this.topRatedMoviesTest = movies;
          
          return this.http.get<Genre>(this.genreURL)
            .pipe(map(data => {
              this.genresTest = data;
              
              this.topRatedMoviesTest.results = this.topRatedMoviesTest.results.filter(
                (movie: results, index: number, arr: results[]) => {
                  let genreId: number = movie.genre_ids[0];
                  let genre;

                  this.genresTest.genres.filter(
                    (val) => {
                      if (val.id == genreId) {
                        genre = val;
                      }
                    }
                  )
                  arr[index].genres = genre;
                  return movie;
                }
              )

              let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
                topRatedMovies: this.topRatedMoviesTest,
                size: this.config.config.images.backdrop_sizes[3],
                base_url: this.config.config.images.secure_base_url
              }

              return wrapper;
            }));
        }));

  }

  getPopularMovies(): Observable<TopRatedMoviesWrapper> {
    return this.http.get<TopRatedMovies>(this.popularMoviesUrl)
      .pipe(map((movies: TopRatedMovies) => {
        this.popularMovies = movies;

        let numberToRemove: number = this.popularMovies.results.length - 14;
        this.popularMovies.results.splice(14, numberToRemove);

        let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
          topRatedMovies: this.popularMovies,
          size: this.config.config.images.backdrop_sizes[3],
          base_url: this.config.config.images.secure_base_url
        };

        return wrapper;
      }))

  }

  getTrendingMovies(): Observable<TopRatedMoviesWrapper> {
    return this.http.get<TopRatedMovies>(this.trendingMoviesUrl)
    .pipe(map((movies: TopRatedMovies) => {
      this.trendingMovies = movies;

      let numberToRemove: number = this.trendingMovies.results.length - 14;
      this.trendingMovies.results.splice(14, numberToRemove);

      let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
        topRatedMovies: this.trendingMovies,
        size: this.config.config.images.backdrop_sizes[3],
        base_url: this.config.config.images.secure_base_url
      };

      console.log(JSON.stringify(this.trendingMovies, null, 2));

      return wrapper;
    }))
  }


  getPopularTvMovies(): Observable<TopRatedMoviesWrapper> {
    return this.http.get<TopRatedMovies>(this.popularTvShowsURL)
    .pipe(map((tvShows: TopRatedMovies) => {
      this.popularTvShows = tvShows;

      let numberToRemove: number = this.popularTvShows.results.length - 14;
      this.popularTvShows.results.splice(14, numberToRemove);

      let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
        topRatedMovies: this.popularTvShows,
        size: this.config.config.images.backdrop_sizes[3],
        base_url: this.config.config.images.secure_base_url
      };

      console.log(JSON.stringify(this.popularTvShows, null, 2));

      return wrapper;
    }))
  }
}
