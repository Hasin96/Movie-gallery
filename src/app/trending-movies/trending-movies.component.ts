import { Component, OnInit, Input } from '@angular/core';
import { TopRatedMoviesWrapper } from '../carousel.service';

import { Router } from '@angular/router';

@Component({
  selector: 'trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.scss']
})
export class TrendingMoviesComponent implements OnInit {

  @Input()
    popularMovies: TopRatedMoviesWrapper;

  @Input()
    trendingMovies: TopRatedMoviesWrapper;

  @Input()
    popularTvShows: TopRatedMoviesWrapper;

  private imagePath: any;

  constructor(private router: Router) { }

  ngOnInit() {
    //this.trendingMovies.topRatedMovies.results = this.trendingMovies.topRatedMovies.results.slice(0, 10);
  }

  private getImagePath(poster_path: string) {

    if (this.popularMovies !== undefined) {
      this.imagePath = {
        'background-image': `linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)),
        url(${this.popularMovies.base_url}${this.popularMovies.size}${poster_path})`,
        'backgroundground-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center'
      }

      return this.imagePath;

    } else if (this.trendingMovies !== undefined) {
      this.imagePath = {
        'background-image': `linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)),
        url(${this.trendingMovies.base_url}${this.trendingMovies.size}${poster_path})`,
        'backgroundground-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center'
      }

      return this.imagePath;
    } else if (this.popularTvShows !== undefined) {
      this.imagePath = {
        'background-image': `linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1)),
        url(${this.popularTvShows.base_url}${this.popularTvShows.size}${poster_path})`,
        'backgroundground-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center'
      }

      return this.imagePath;
    }
  }

  private GetDetails(id: string) {
    this.router.navigate(['movie-detail', id]);
  }

}
