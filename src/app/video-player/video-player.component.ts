import { Component, OnInit } from '@angular/core';

import { TokenInterceptorService, TopRatedMoviesWrapper } from '../carousel.service';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { VideoUrl } from '../models/genres';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  private movieId : string;
  private videoUrl;

  constructor(private activatedRoute: ActivatedRoute,private service: TokenInterceptorService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.movieId = params.get('id');
        this.service.getVideoUrl(parseInt(this.movieId)).subscribe(
          (url: VideoUrl) => {
            this.videoUrl = url
            console.log(this.videoUrl);
          }
        )
      }
    )
  }

}
