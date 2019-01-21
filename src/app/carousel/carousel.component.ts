import { Component, OnInit } from '@angular/core';

// Carousel Service
import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';
import { url } from 'inspector';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  private CLASS_NAME = `CarouselComponent`;

  private topRatedMovies: TopRatedMoviesWrapper;
  private imagePath;

  constructor(private service: TokenInterceptorService ) { }

  ngOnInit() {
    const METHOD_NAME = `${this.CLASS_NAME} ngOnInit()`;
    console.log(METHOD_NAME);

    this.service.getMovies()
      .subscribe(
        (obj: TopRatedMoviesWrapper) => {
          this.topRatedMovies = obj;
          console.log(JSON.stringify(this.topRatedMovies, null, 2));

          if(this.topRatedMovies.topRatedMovies !== undefined && this.topRatedMovies.topRatedMovies !== null) {
            this.getImage();
          }
        }
      )

  }

  private getImage() {
    const METHOD_NAME = `${this.CLASS_NAME} getImage()`;

    console.log(METHOD_NAME, 'LOOK HASIN', JSON.stringify(this.topRatedMovies.topRatedMovies, null, 2));
    //this.imagePath = `${this.topRatedMovies.base_url}${this.topRatedMovies.size}${this.topRatedMovies.topRatedMovies.results[0].poster_path}`;
    this.imagePath = {
      'background-image': `url(${this.topRatedMovies.base_url}${this.topRatedMovies.size}${this.topRatedMovies.topRatedMovies.results[0].backdrop_path})`
    };

    
  }

  private getImages() {

    this.service.getImages(
        .subscribe(
          (obj: Image) {
            
          }
        )
    )
    
  }


}
