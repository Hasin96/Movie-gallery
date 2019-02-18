import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';

import { imagePathConfiguration } from '../config/config';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';
import { MovieCarouselSmartComponent } from './movie-carousel-smart/movie-carousel-smart.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { VideoPlayerComponent } from './video-player/video-player.component'

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    TrendingMoviesComponent,
    MovieCarouselSmartComponent,
    HomeComponent,
    FooterComponent,
    LoginPageComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule 
  ],
  providers: [imagePathConfiguration],
  bootstrap: [AppComponent]
})
export class AppModule { }
