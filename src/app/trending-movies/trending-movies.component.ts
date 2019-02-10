import { Component, OnInit, Input } from '@angular/core';
import { TopRatedMoviesWrapper } from '../carousel.service';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { imagePathConfiguration } from '../../config/config';
import { TopRatedMovies } from '../models/top-rated-movies';

@Component({
  selector: 'trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.scss']
})
export class TrendingMoviesComponent implements OnInit {
  private CLASS_NAME = "TrendingMoviesComponent";

  @Input()
    popularMovies: Observable<TopRatedMovies>;

  @Input()
    trendingMovies: Observable<TopRatedMovies>;

  @Input()
    upcomingMovies: Observable<TopRatedMovies>;

  @Input()
    popularTvShows: TopRatedMoviesWrapper;

  private imagePath: any;
  private test: string = "p";

  constructor(private router: Router,
              private config: imagePathConfiguration
              ) { }

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
        url(${this.config.config.images.secure_base_url}${this.config.config.images.backdrop_sizes[3]}${poster_path})`,
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
        url(${this.config.config.images.secure_base_url}${this.config.config.images.backdrop_sizes[3]}${poster_path})`,
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

  getDiff(letter: string) {
    console.log("hit");
    console.log(this.test);

    this.test = letter;   
   // this.zone.run(() => this.test = !this.test);
  }

}
