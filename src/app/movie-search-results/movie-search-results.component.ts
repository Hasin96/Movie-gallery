import { Component, OnInit, Input } from '@angular/core';

import { results } from '../models/top-rated-movies';
import { TopRatedMoviesWrapper } from '../carousel.service';

@Component({
  selector: 'movie-search-results',
  templateUrl: './movie-search-results.component.html',
  styleUrls: ['./movie-search-results.component.scss']
})
export class MovieSearchResultsComponent implements OnInit {

  @Input()
    searchedMovies: TopRatedMoviesWrapper;

  private imagePath = {};

  private CLASS_NAME = 'movie-search-results';

  constructor() { }

  ngOnInit() {
    const METHOD_NAME = 'ngOnInit()';

    console.log(this.CLASS_NAME, METHOD_NAME);

    console.log(JSON.stringify(this.searchedMovies,null,4));
  }

  getImagePath() {
    this.imagePath = {
      'background-image': `url(${this.searchedMovies.base_url}${this.searchedMovies.size}${this.searchedMovies.topRatedMovies.results[0].poster_path})`,
      'backgroundground-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-position': 'center'
    }

    return this.imagePath;
  }

}
