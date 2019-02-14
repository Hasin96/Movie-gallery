import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    popularTvShows: Observable<TopRatedMovies>;

  @Output() exampleOutput = new EventEmitter<string>();

  private imagePath: any;
  private test: string = "p";

  constructor(private router: Router,
              private config: imagePathConfiguration
              ) { }

  ngOnInit() {

    //this.trendingMovies.topRatedMovies.results = this.trendingMovies.topRatedMovies.results.slice(0, 10);
  }

  exampleMethodChild(letter: string) {
    console.log("HASINHASIN");
    this.exampleOutput.emit(letter);
 }


  private getImagePath(poster_path: string) {

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
  }

  private GetDetails(id: string) {
    this.router.navigate(['movie-detail', id]);
  }

  getDiff(letter: string) {
    console.log("hit");
    console.log(this.test);
    this.exampleMethodChild(letter);
    //this.test = letter;   
   // this.zone.run(() => this.test = !this.test);
  }

}
