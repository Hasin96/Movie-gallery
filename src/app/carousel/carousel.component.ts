import { Component, OnInit } from '@angular/core';

// Carousel Service
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

// Image Service
import { Image } from '../models/image';

import { results, TopRatedMovies } from '../models/top-rated-movies';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// router
import { Router } from '@angular/router';

import { imagePathConfiguration } from '../../config/config';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  private CLASS_NAME = `CarouselComponent`;

  private topRatedMovies: Observable<TopRatedMovies>;
  private imagePath;
  private count: number = 0;
  private movieId: number;

  constructor(private service: TokenInterceptorService,
              private router: Router,
              private config: imagePathConfiguration ) { }

  ngOnInit() {
    const METHOD_NAME = `${this.CLASS_NAME} ngOnInit()`;
    console.log(METHOD_NAME);
    this.topRatedMovies = this.service.upcomingShows;
    this.service.loadAll();
  }


  getImagePath(movie: results) {
    const METHOD_NAME = this.CLASS_NAME + 'getImagePath()';

    //console.log(METHOD_NAME, JSON.stringify(movie, null, 2));
    
    this.imagePath = {
      'background-image': `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ),url(${this.config.config.images.secure_base_url}${this.config.config.images.backdrop_sizes[3]}${movie.backdrop_path})`
    }
    console.log("PINEAPPLE", movie);

    //console.log(METHOD_NAME, JSON.stringify(this.imagePath, null, 2));
    return this.imagePath;
  }

  private onClickDetailBtn(movie: results) {
    alert("it works :3");
      this.router.navigate(['movie-detail', movie.id]);
  }

  // private getImages(movieId) {


  //   this.imageService.getImages(movieId)
  //       .subscribe(
  //         (obj: Image[]) =>  {
  //           console.log(JSON.stringify(obj, null, 2));
  //           this.topRatedMovies.topRatedMovies.results.filter(
  //             (results: results) => {
  //               if (results.id == movieId) {
  //                 results.images = obj;
  //               }
  //             }
  //           )
  //           for(let i of this.topRatedMovies.topRatedMovies.results) {
  //             console.log(JSON.stringify(i.images, null, 2));
  //           }

  //         }
  //       )
    
  // }


}
