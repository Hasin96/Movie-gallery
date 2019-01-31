import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

// Carousel Service
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  private movieId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private service: TokenInterceptorService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.movieId = params.get('id');
        let movie = this.service.getMovieById(this.movieId);

        console.log(JSON.stringify(movie, null, 2));
          
      }
    )
  }

}
