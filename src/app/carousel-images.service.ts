import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http} from '@angular/http';

import { configuration } from '../config/config';

// models
import { Image } from './models/image';
import { Subscription, ReplaySubject, Observable } from 'rxjs';

// common serivce
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselImagesService {
  private CLASS_NAME = 'CarouselImagesService';

  private subImages: Subscription;

  //subject
  private subject: ReplaySubject<Image[]>;

  // identifiers
  private movieId: number;

  // image properties
  private images: Image[] = [];

  constructor(private http: HttpClient,
              private common: CommonService) { }

  public getImages(movieId: number) : Observable<Image[]> {

    if(this.movieId !== movieId) {
      this.movieId = movieId;
    }

    this.subject = this.common.replaySubjectComplete(this.subject);

    if(!this.subscribeToSource()) {

      this.build();
    }

    return this.subject.asObservable();

  }

  private subscribeToSource() : boolean {
    const METHOD_NAME = `${this.CLASS_NAME} 'subscribeToSource()`;
    console.log(METHOD_NAME);

    let didSubscribe: boolean = false;

    if(!this.common.isSubscriptionValid(this.subImages)) {
        this.http.get<Image[]>(`https://api.themoviedb.org/3/movie/${this.movieId}/images?api_key=cc86d53f868a7efefe0b7f6ca0bc872c`)
          .subscribe(
            (obj: Image[]) => {
              console.log(METHOD_NAME, JSON.stringify(obj, null, 2));
              this.images = obj;
              this.build();
            }
          )

          didSubscribe = true;
    }

    return didSubscribe;

  }

  private build() {
    const METHOD_NAME = `${this.CLASS_NAME} build()`;

    if(!this.common.hasArrayData(this.images)) {
      console.log(METHOD_NAME, 'failed at checking for arrayData'); return;
    }

    this.subject.next(this.images);
  }
}
