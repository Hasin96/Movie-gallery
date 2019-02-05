import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

import { results, TopRatedMovies } from '../models/top-rated-movies';
import { Subscription } from 'rxjs';
import { PagerService } from '../shared/pager-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  private CLASS_NAME = 'MovieSearchComponent';

  private movies: TopRatedMoviesWrapper;

  private sub: Subscription;

  pager: any = {};
 
  // paged items
  pagedItems;

  private imagePath = {};

  private styles = {
    'z-index': '-1',
    'zindex': '-1'
  }

  constructor(private service: TokenInterceptorService,
              private pageService: PagerService,
              private router: Router) { }

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
    const METHOD_NAME  = this.CLASS_NAME + 'setPage()';
    // get pager object from service
    let results = this.movies.topRatedMovies.results;

    this.pager = this.pageService.getPager(results.length, page);

    // get current page of items
    this.pagedItems = results.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

getImagePath(poster_path: string) {
  this.imagePath = {
    'background-image': `linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)),
      url(${this.movies.base_url}${this.movies.size}${poster_path})`,
    'backgroundground-repeat': 'no-repeat',
    'background-size': 'cover',
    'background-position': 'center'
  }

  return this.imagePath;
}

private onClickDetails(movie: results) {
  this.styles = {
    'z-index': '-1',
    'zindex': '-1'
  };

  this.router.navigate(['movie-detail', movie.id]);
}

closeSearchResults() {
  this.styles = {
    'z-index': '-1',
    'zindex': '-1'
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
