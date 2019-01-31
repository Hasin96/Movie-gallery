import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

import { results, TopRatedMovies } from '../models/top-rated-movies';

@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  private movies: TopRatedMoviesWrapper;

  constructor(private service: TokenInterceptorService) { }

  ngOnInit() {
    console.log("INIT");
  }

  private search(term: string) {
    console.log(term);
    if (this.movies === null || this.movies === undefined) {
    if (term === '' || term === undefined || term === null) { return; }
    this.service.getMoviesBySearch(term)
      .subscribe(
        (obj: TopRatedMoviesWrapper) => {
          this.movies = obj;
          console.log('HASIN',JSON.stringify(this.movies, null, 4));
        }
      )
    } else {
      this.movies.topRatedMovies.results = [];

      this.service.getMoviesBySearch(term)
      .subscribe(
        (obj: TopRatedMoviesWrapper) => {
          this.movies = obj;
          console.log('HASIN',JSON.stringify(this.movies, null, 4));
        }
      )
    }
   
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
