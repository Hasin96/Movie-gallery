import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';
import { TopRatedMovies } from '../models/top-rated-movies';

import { Observable } from 'rxjs';

@Component({
  selector: 'movie-carousel-smart',
  templateUrl: './movie-carousel-smart.component.html',
  styleUrls: ['./movie-carousel-smart.component.scss']
})
export class MovieCarouselSmartComponent implements OnInit {
  private popularTvShows: Observable<TopRatedMovies>;

  private popularMovies: Observable<TopRatedMovies>;

  private bul: boolean = false;

  constructor(private movieService: TokenInterceptorService) { }

  ngOnInit() {
    // this.movieService.getPopularMovies()
    //   .subscribe(
    //     (movies: TopRatedMoviesWrapper) => {
    //       this.popularMoviesWrapper = movies;
    //       //console.log(JSON.stringify(this.popularMoviesWrapper, null, 4));
    //     }
    //   )
    console.log("PINEAPPLEKING");
    this.popularMovies = this.movieService.topRatedMovies;
    this.popularTvShows = this.movieService.tvShows;
    // this.trendingMovies = this.movieService.trendingMovies;
    // this.upcomingMovies = this.movieService.upcomingShows;
    this.movieService.getPopularMovies();
    this.movieService.getTrendingMovies();
    this.movieService.getPopularTvMovies();

    // this.movieService.getTrendingMovies()
    //     .subscribe(
    //       (movies: TopRatedMoviesWrapper) => {
    //         this.trendingMoviesWrapper = movies;
    //         //console.log(JSON.stringify(this.trendingMoviesWrapper, null, 4));
    //       }
    //     )

    // this.movieService.getPopularTvMovies()
    //       .subscribe(
    //         (tvShows: TopRatedMoviesWrapper) => {
    //           this.popularTvShowsWrapper = tvShows;
    //           //console.log("HASIN", JSON.stringify(this.popularTvShowsWrapper, null, 2))
    //         }
    //       )
  }

  exampleMethodParent(letter: string) {
    console.log("HASIN LOOK THE LETTER IS " + letter);

    switch(letter) {
      case "p": {
        console.log("P");
        this.popularMovies = this.movieService.topRatedMovies;
        break;
      }
      case "t": {
        console.log("t");
        this.popularMovies = this.movieService.trendingMovies;
        break;
      }
      case "u": {
        console.log("u")
        this.popularMovies = this.movieService.upcomingShows;
        break;
      }
      default: {
        this.popularMovies = this.movieService.topRatedMovies
        break;
      }
    }
  }
}
