import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

import { results, TopRatedMovies } from '../models/top-rated-movies';
import { Subscription } from 'rxjs';
import { PagerService } from '../shared/pager-service.service';


@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  private movies: TopRatedMoviesWrapper;

  private sub: Subscription;

  pager: any = {};
 
  // paged items
  pagedItems: TopRatedMoviesWrapper;

  private styles = {
    'z-index': '-1',
    'zindex': '-1'
  }

  constructor(private service: TokenInterceptorService,
              private pageService: PagerService) { }

  ngOnInit() {
    console.log("INIT");
  }

  private search(term: string) {
    console.log("Hasin", term);
    if (this.movies === null || this.movies === undefined) {
      if (term !== '' || term !== undefined || term !== null) {
        console.log("HASIN", term);
        this.sub = this.service.getMoviesBySearch(term)
          .subscribe(
            (obj: TopRatedMoviesWrapper) => {
              this.movies = obj;

              this.setPage(1);
              
            }
          )
      }
      this.styles = {
        'z-index': '1000',
        'zindex': '1000'
      }

    } else {
      this.movies.topRatedMovies.results = [];
      if (term !== '' || term !== undefined || term !== null) {
      this.sub = this.service.getMoviesBySearch(term)
        .subscribe(
          (obj: TopRatedMoviesWrapper) => {
            this.movies = obj;

            this.setPage(1);
          }
        )
      }
      this.styles = {
        'z-index': '1000',
        'zindex': '1000'
      }
    }


  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pageService.getPager(this.movies.topRatedMovies.results.length, page);

    // get current page of items
    this.pagedItems = this.movies;
    
    this.pagedItems.topRatedMovies.results = this.movies.topRatedMovies.results.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
