import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { configuration } from '../config/config';

// models
import { TopRatedMovies } from './models/top-rated-movies';
import { Subscription, ReplaySubject, Observable, from } from 'rxjs';

// commons service
import { CommonService } from './common.service';

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

  //url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=cc86d53f868a7efefe0b7f6ca0bc872c&language=en-GB';
  private url: string = 'https://api.themoviedb.org/3/movie/popular?api_key=cc86d53f868a7efefe0b7f6ca0bc872c&language=en-GB&page=1'
  private movieURL: string = 'https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US';

  private topRated: TopRatedMovies;

  // SUBJECT
  private subTopRatedMovies: Subscription;

  // REPLAY SUBJECT
  private subject: ReplaySubject<TopRatedMoviesWrapper>;

  constructor(private http: HttpClient,
              private config: configuration,
              private common: CommonService
              ) { }

  public getMovies(): Observable<TopRatedMoviesWrapper> {
    const METHOD_NAME = `${this.CLASS_NAME} getMovies()`;
    console.log(METHOD_NAME);

    this.subject = this.common.replaySubjectComplete(this.subject);

    if (!this.subscribeToSource()) {


      this.build();
    }

    return this.subject.asObservable();

  }

  private subscribeToSource(): boolean {
    const METHOD_NAME = `${this.CLASS_NAME} subscribeToSource()`;
    console.log(METHOD_NAME);

    let didSubscribe: boolean = false;

    if (!this.common.isSubscriptionValid(this.subTopRatedMovies)) {
      this.http.get<TopRatedMovies>(this.url)
        .subscribe(
          (movies: TopRatedMovies) => {
            this.topRated = movies;
            this.build();

          },
          (err) => console.log(`${METHOD_NAME} failed err`)
        );

        didSubscribe = true;
    }
    
    return didSubscribe;
  }

  private build() {
    const METHOD_NAME = `${this.CLASS_NAME} build()`;
    console.log(METHOD_NAME);

    if(!this.common.hasArrayData(this.topRated.results)) {
      console.log(`${METHOD_NAME} hasArrayData failed`); return;
    }
      console.log(METHOD_NAME, JSON.stringify(this.topRated.results, null, 2));
      let numberToRemove: number = this.topRated.results.length - 4;
      this.topRated.results.splice(4, numberToRemove);
      console.log(METHOD_NAME, JSON.stringify(this.topRated.results, null, 2));
      


    let wrapper: TopRatedMoviesWrapper = <TopRatedMoviesWrapper>{
      topRatedMovies: this.topRated,
      size: this.config.config.images.backdrop_sizes[3],
      base_url: this.config.config.images.secure_base_url
    }

    this.subject.next(wrapper);
  }

  // RXJS Subject

  
  
}
