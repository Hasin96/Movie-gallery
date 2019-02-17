import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { CarouselComponent } from './carousel/carousel.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
