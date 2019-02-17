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

  private cachedUpComingMovies: Observable<TopRatedMovies>;
  private cachedTrendingMovies: Observable<TopRatedMovies>;
  private cachedTopRatedMovies: Observable<TopRatedMovies>;

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
    this.cachedTopRatedMovies = this.movieService.topRatedMovies;
    this.cachedUpComingMovies = this.movieService.upcomingShows;
    this.cachedTrendingMovies = this.movieService.trendingMovies;
    this.popularTvShows = this.movieService.tvShows;
    
    this.popularMovies = this.cachedTopRatedMovies;
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
        this.popularMovies = this.cachedTopRatedMovies;
        break;
      }
      case "t": {
        this.popularMovies = this.cachedTrendingMovies;
        break;
      }
      case "u": {
        this.popularMovies = this.cachedUpComingMovies;
        break;
      }
      default: {
        //this.popularMovies = this.movieService.topRatedMovies
        break;
      }
    }
  }
}
