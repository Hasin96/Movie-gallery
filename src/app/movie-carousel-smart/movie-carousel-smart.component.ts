import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

@Component({
  selector: 'movie-carousel-smart',
  templateUrl: './movie-carousel-smart.component.html',
  styleUrls: ['./movie-carousel-smart.component.scss']
})
export class MovieCarouselSmartComponent implements OnInit {
  private popularMoviesWrapper: TopRatedMoviesWrapper;

  private trendingMoviesWrapper: TopRatedMoviesWrapper;

  private popularTvShowsWrapper: TopRatedMoviesWrapper;

  constructor(private movieService: TokenInterceptorService) { }

  ngOnInit() {
    this.movieService.getPopularMovies()
      .subscribe(
        (movies: TopRatedMoviesWrapper) => {
          this.popularMoviesWrapper = movies;
          //console.log(JSON.stringify(this.popularMoviesWrapper, null, 4));
        }
      )

    this.movieService.getTrendingMovies()
        .subscribe(
          (movies: TopRatedMoviesWrapper) => {
            this.trendingMoviesWrapper = movies;
            //console.log(JSON.stringify(this.trendingMoviesWrapper, null, 4));
          }
        )

    this.movieService.getPopularTvMovies()
          .subscribe(
            (tvShows: TopRatedMoviesWrapper) => {
              this.popularTvShowsWrapper = tvShows;
              //console.log("HASIN", JSON.stringify(this.popularTvShowsWrapper, null, 2))
            }
          )
  }

}
