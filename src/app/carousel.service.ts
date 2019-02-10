import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { imagePathConfiguration } from '../config/config';

// models
import { TopRatedMovies, results } from './models/top-rated-movies';
import { Subscription, ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

// apikey
import { apikey } from '../environments/movieApiKey';

// commons service
import { CommonService } from './common.service';
import { map, switchMap } from 'rxjs/operators';
import { Genre } from './models/genres';

import { MoviedbRequestsService } from './core/moviedb-requests.service';

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
  upcomingShows: Observable<TopRatedMovies>;
  topRatedMovies: Observable<TopRatedMovies>;
  trendingMovies: Observable<TopRatedMovies>;
  private _upcomingShows: BehaviorSubject<TopRatedMovies>; 
  private _topRatedShows: BehaviorSubject<TopRatedMovies>;
  private _trendingShows: BehaviorSubject<TopRatedMovies>;
  private dataStore: {  // This is where we will store our data in memory
    upcomingShows: TopRatedMovies,
    topRated: TopRatedMovies,
    trendingMovies: TopRatedMovies
  };

  private genreURL: string = 'https://api.themoviedb.org/3/genre/movie/list?api_key='+apikey+'&language=en-GB';
  private url: string = 'https://api.themoviedb.org/3/movie/upcoming?api_key='+apikey+'&language=en-GB&page=1'
  private movieUrl:string = "https://api.themoviedb.org/3/search/movie?api_key="+apikey+"&language=en-US&page=1&include_adult=false&query=";
  private popularMoviesUrl: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
  private trendingMoviesUrl: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
  private popularTvShowsURL: string = `https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=en-US&page=1`

  //private topRatedMovies: TopRatedMovies;
  private topRatedMoviesTest: TopRatedMovies;
  private genresTest;
  // for genre
  private genres;

  // popular movies
  //private popularMovies: TopRatedMovies;

  // trending movies
  //private trendingMovies: TopRatedMovies;

  // popular tv shows
  private popularTvShows: TopRatedMovies;

  constructor(private http: HttpClient,
              private config: imagePathConfiguration,
              private common: CommonService,
              private coreService: MoviedbRequestsService
              ) { 
                this.dataStore = { 
                  upcomingShows: null,
                  topRated: null,
                  trendingMovies: null
                }
                this._topRatedShows = <BehaviorSubject<TopRatedMovies>>new BehaviorSubject({});
                this.topRatedMovies = this._topRatedShows.asObservable();
                this._upcomingShows = <BehaviorSubject<TopRatedMovies>>new BehaviorSubject({});
                this.upcomingShows = this._upcomingShows.asObservable();
                this._trendingShows = <BehaviorSubject<TopRatedMovies>>new BehaviorSubject({});
                this.trendingMovies = this._trendingShows.asObservable();
              }

              
    
  loadAll() {
    console.log("loadALL() called")
    let obs = this.http.get<TopRatedMovies>(this.url)
        .pipe(switchMap(movies => {
          
          return this.http.get<Genre>(this.genreURL)
            .pipe(map(data => {
              this.genres = data;
              
              movies.results = movies.results.filter(
                (movie: results, index: number, arr: results[]) => {
                  //let genreId: number = movie.genre_ids[0];
                  let genre = [];

                  this.genres.genres.filter(
                    (val) => {
                      // if (val.id == genreId) {
                      //   genre = val;
                      // }
                      for(let i = 0; i < movie.genre_ids.length; i++) {
                        if (val.id == movie.genre_ids[i]) {
                          genre.push(val);
                        }
                      }
                    }
                  )
                  arr[index].genres = genre;
                  return movie;
                }
              )
              
              return movies;
            }));
        }));

        obs.subscribe(
          (obj) => {
            console.log("HIT");
            this.dataStore.upcomingShows = obj;
            this._upcomingShows.next(Object.assign({}, this.dataStore).upcomingShows);
          }
        )

        console.log("pie");
  }

  // public getMovies() : Observable<TopRatedMoviesWrapper> {
    

  //   return this.http.get<TopRatedMovies>(this.url)
  //       .pipe(switchMap(movies => {
  //         this.topRatedMovies = movies;
          
  //         let numberToRemove: number = this.topRatedMovies.results.length - 4;
  //         this.topRatedMovies.results.splice(4, numberToRemove);
      
  //         return this.http.get<Genre>(this.genreURL)
  //           .pipe(map(data => {
  //             this.genres = data;
              
  //             this.topRatedMovies.results = this.topRatedMovies.results.filter(
  //               (movie: results, index: number, arr: results[]) => {
  //                 let genreId: number = movie.genre_ids[0];
  //                 let genre;

  //                 this.genres.genres.filter(
  //                   (val) => {
  //                     if (val.id == genreId) {
  //                       genre = val;
  //                     }
  //                   }
  //                 )
  //                 arr[index].genres = genre;
  //                 return movie;
  //               }
  //             )

  //             let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
  //               topRatedMovies: this.topRatedMovies,
  //               size: this.config.config.images.backdrop_sizes[3],
  //               base_url: this.config.config.images.secure_base_url
  //             }
             
  //             return wrapper;
  //           }));
  //       }));
  // }

  getMovieById(id: number) : results { 
    console.log(id);
    console.log(JSON.stringify(this.dataStore.upcomingShows, null, 2));
    let movie =  this.dataStore.upcomingShows.results.find(
      (val: results, idx: number, arr: results[]) => {
        return val.id === id;
      }
    )
    console.log("CHECK", movie);
    if (movie === undefined) {
      movie = this.dataStore.topRated.results.find(
        (val: results) => {
          return val.id === id;
        }
      )
    }

    if (movie === undefined) {
      movie = this.dataStore.trendingMovies.results.find(
        (val: results) => {
          return val.id === id;
        }
      )
    }
    
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

  getPopularMovies() {
    // return this.http.get<TopRatedMovies>(this.popularMoviesUrl)
    //   .pipe(map((movies: TopRatedMovies) => {
    //     this.popularMovies = movies;

    //     let numberToRemove: number = this.popularMovies.results.length - 14;
    //     this.popularMovies.results.splice(14, numberToRemove);

    //     let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
    //       topRatedMovies: this.popularMovies,
    //       size: this.config.config.images.backdrop_sizes[3],
    //       base_url: this.config.config.images.secure_base_url
    //     };

    //     return wrapper;
    //   }))

    let obs = this.http.get<TopRatedMovies>(this.popularMoviesUrl)
        .pipe(switchMap(movies => {
          return this.http.get<Genre>(this.genreURL)
            .pipe(map(data => {
              movies.results = movies.results.filter(
                (movie: results, index: number, arr: results[]) => {
                  //let genreId: number = movie.genre_ids[0];
                  let genre = [];

                  this.genres.genres.filter(
                    (val) => {
                      // if (val.id == genreId) {
                      //   genre = val;
                      // }
                      for(let i = 0; i < movie.genre_ids.length; i++) {
                        if (val.id == movie.genre_ids[i]) {
                          genre.push(val);
                        }
                      }
                    }
                  )
                  arr[index].genres = genre;
                  return movie;
                }
              )
              
              return movies;
            }));
        }));

        obs.subscribe(
          (obj) => {
            console.log("HIT");
            this.dataStore.topRated = obj;
            this._topRatedShows.next(Object.assign({}, this.dataStore).topRated);
          }
        )

        console.log("pie");
  }

  getTrendingMovies() {
    // return this.http.get<TopRatedMovies>(this.trendingMoviesUrl)
    // .pipe(map((movies: TopRatedMovies) => {
    //   this.trendingMovies = movies;

    //   let numberToRemove: number = this.trendingMovies.results.length - 14;
    //   this.trendingMovies.results.splice(14, numberToRemove);

    //   let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
    //     topRatedMovies: this.trendingMovies,
    //     size: this.config.config.images.backdrop_sizes[3],
    //     base_url: this.config.config.images.secure_base_url
    //   };

    //  // console.log(JSON.stringify(this.trendingMovies, null, 2));

    //   return wrapper;
    // }))

    let obs = this.http.get<TopRatedMovies>(this.trendingMoviesUrl)
        .pipe(switchMap(movies => {
          return this.http.get<Genre>(this.genreURL)
            .pipe(map(data => {
              movies.results = movies.results.filter(
                (movie: results, index: number, arr: results[]) => {
                  //let genreId: number = movie.genre_ids[0];
                  let genre = [];

                  this.genres.genres.filter(
                    (val) => {
                      // if (val.id == genreId) {
                      //   genre = val;
                      // }
                      for(let i = 0; i < movie.genre_ids.length; i++) {
                        if (val.id == movie.genre_ids[i]) {
                          genre.push(val);
                        }
                      }
                    }
                  )
                  arr[index].genres = genre;
                  return movie;
                }
              )
              
              return movies;
            }));
        }));

        obs.subscribe(
          (obj) => {
            console.log("HIT");
            this.dataStore.trendingMovies = obj;
            this._trendingShows.next(Object.assign({}, this.dataStore).trendingMovies);
          }
        )

        console.log("pie");
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

      //console.log(JSON.stringify(this.popularTvShows, null, 2));

      return wrapper;
    }))
  }
}
