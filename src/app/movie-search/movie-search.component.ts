import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

import { results, TopRatedMovies } from '../models/top-rated-movies';
import { Subscription } from 'rxjs';

@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  private movies: TopRatedMoviesWrapper;

  private sub: Subscription;

  private styles = {
    'z-index': '-1',
    'zindex': '-1'
  }

  constructor(private service: TokenInterceptorService) { }

  ngOnInit() {
    console.log("INIT");
  }

  private search(term: string) {
    console.log(term);
    if (this.movies === null || this.movies === undefined) {
      if (term !== '' || term !== undefined || term !== null) {
        console.log("HASIN", term);
        this.sub = this.service.getMoviesBySearch(term)
          .subscribe(
            (obj: TopRatedMoviesWrapper) => {
              this.movies = obj;
              console.log('HASIN', JSON.stringify(obj, null, 4));
              console.log('HASIN', JSON.stringify(this.movies, null, 4));
            }
          )
      }

    } else {
      this.movies.topRatedMovies.results = [];

      this.sub = this.service.getMoviesBySearch(term)
        .subscribe(
          (obj: TopRatedMoviesWrapper) => {
            this.movies = obj;
            console.log('HASIN', JSON.stringify(obj, null, 4));
            console.log('HASIN', JSON.stringify(this.movies, null, 4));
          }
        )
      this.styles = {
        'z-index': '10',
        'zindex': '10'
      }
    }


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // private checkTheDataFam() {
  //   console.log("pineapple");
  //   for(let i of this.movies) {
  //     switch(i.media_type) { 
  //       case 'tv': { 
  //          //statements; 
  //          console.log('tv');
  //          break; 
  //       } 
  //       case 'movie': { 
  //          //statements; 
  //          console.log('movie');
  //          break; 
  //       } 
  //       case 'person': { 
  //          //statements; 
  //          console.log('person');
  //          break; 
  //       } 

  //       default: {
  //         console.log('default');
  //         break;
  //       }
  //     }
  //   }
  // }


}
