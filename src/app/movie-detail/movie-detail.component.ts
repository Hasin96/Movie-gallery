import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

// Carousel Service
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';
import { results } from '../models/top-rated-movies';

import { imagePathConfiguration } from '../../config/config';

import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  faStar = faStar;

  private movieId: string;
  private movie: results;
  private rating: number;
  private imagePath;

  constructor(private activatedRoute: ActivatedRoute,
              private service: TokenInterceptorService,
              private config: imagePathConfiguration) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.movieId = params.get('id');
        this.movie = this.service.getMovieById(parseInt(this.movieId));
        this.rating = Math.floor(this.movie.vote_average);
        console.log(JSON.stringify(this.movie, null, 2));
      }
    )
  }

  createRange(number){
    let items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  
  getImagePath() {

    //console.log(METHOD_NAME, JSON.stringify(movie, null, 2));
    
    this.imagePath = {
      'background-image': `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ),url(${this.config.config.images.secure_base_url}${this.config.config.images.backdrop_sizes[3]}${this.movie.backdrop_path})`
    }

    //console.log(METHOD_NAME, JSON.stringify(this.imagePath, null, 2));
    return this.imagePath;
  }

  getImagePaths() {

    //console.log(METHOD_NAME, JSON.stringify(movie, null, 2));
    
    let imagePath = {
      'background-image': `linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)),
      url(${this.config.config.images.secure_base_url}${this.config.config.images.backdrop_sizes[3]}${this.movie.poster_path})`,
    'backgroundground-repeat': 'no-repeat',
    'background-size': 'cover',
    'background-position': 'center'
    }

    //console.log(METHOD_NAME, JSON.stringify(this.imagePath, null, 2));
    return imagePath;
  }

}
