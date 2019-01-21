import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { configuration } from '../config/config';

// models
import { TopRatedMovies } from './models/top-rated-movies';
import { Subscription, ReplaySubject, Observable } from 'rxjs';

// common serivce
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselImagesService {
  private CLASS_NAME = 'CarouselImagesService';

  private subImages: Subscription;

  // identifiers
  private movieId: number;

  // image properties
  

  constructor(private http: HttpClient,
              private common: CommonService) { }

  public getImages(movieId: number) {

    if(movieId !== movieId) {
      this.movieId = movieId;
    }

    if(!this.subscribeToSource()) {

      this.build();
    }

  }

  private subscribeToSource() : boolean {
    const METHOD_NAME = `${this.CLASS_NAME} 'subscribeToSource()`;
    console.log(METHOD_NAME);

    let didSubscribe: boolean = false;

    if(!this.common.isSubscriptionValid(this.subImages)) {
        this.http.get(`https://api.themoviedb.org/3/movie/${this.movieId}/images?api_key=cc86d53f868a7efefe0b7f6ca0bc872c&language=en-GB`)
          .subscribe(
            (obj) => {
              console.log(METHOD_NAME, JSON.stringify(obj, null, 2));

            }
          )

          didSubscribe = true;
    }

    return didSubscribe;

  }
}
