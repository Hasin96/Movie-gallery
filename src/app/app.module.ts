import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';

import { configuration } from '../config/config';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';
import { MovieCarouselSmartComponent } from './movie-carousel-smart/movie-carousel-smart.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    TrendingMoviesComponent,
    MovieCarouselSmartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
