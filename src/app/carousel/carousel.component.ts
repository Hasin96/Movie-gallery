import { Component, OnInit } from '@angular/core';

// Carousel Service
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

// Image Service
import { CarouselImagesService } from '../carousel-images.service';
import { Image } from '../models/image';

import { results } from '../models/top-rated-movies';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  private CLASS_NAME = `CarouselComponent`;

  private topRatedMovies: TopRatedMoviesWrapper;
  private imagePath;

  private movieId: number;

  constructor(private service: TokenInterceptorService,
              private imageService: CarouselImagesService ) { }

  ngOnInit() {
    const METHOD_NAME = `${this.CLASS_NAME} ngOnInit()`;
    console.log(METHOD_NAME);

    this.getContent();
  }

  private getContent() {
    this.service.getMovies()
    .subscribe(
      (obj: TopRatedMoviesWrapper) => {
        this.topRatedMovies = obj;
        console.log(JSON.stringify(this.topRatedMovies, null, 2));
       
      }
    )
  }

 

  getImagePath(movie: results) {
    const METHOD_NAME = this.CLASS_NAME + 'getImagePath()';

    console.log(METHOD_NAME, JSON.stringify(movie, null, 2));
    
    this.imagePath = {
      'background-image': `url(${this.topRatedMovies.base_url}${this.topRatedMovies.size}${movie.backdrop_path})`
    }

    console.log(METHOD_NAME, JSON.stringify(this.imagePath, null, 2));
    return this.imagePath;
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
