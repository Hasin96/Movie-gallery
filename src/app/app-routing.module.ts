import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { CarouselComponent } from './carousel/carousel.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: CarouselComponent },
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
