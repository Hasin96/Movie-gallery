import { Component, OnInit, Input } from '@angular/core';

import { results } from '../models/top-rated-movies';
import { TopRatedMoviesWrapper } from '../carousel.service';

// router
import { Router } from '@angular/router';
import { StylesCompileDependency } from '@angular/compiler';

@Component({
  selector: 'movie-search-results',
  templateUrl: './movie-search-results.component.html',
  styleUrls: ['./movie-search-results.component.scss']
})
export class MovieSearchResultsComponent implements OnInit {

  @Input()
    searchedMovies: TopRatedMoviesWrapper;
    
  @Input()
    styles;

  private imagePath = {};

  private CLASS_NAME = 'movie-search-results';

  constructor(private router: Router) { }

  ngOnInit() {
    const METHOD_NAME = 'ngOnInit()';

    console.log(this.CLASS_NAME, METHOD_NAME);

    console.log(JSON.stringify(this.searchedMovies,null,4));
  }

  getImagePath(poster_path: string) {
    this.imagePath = {
      'background-image': `linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)),
        url(${this.searchedMovies.base_url}${this.searchedMovies.size}${poster_path})`,
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

}
