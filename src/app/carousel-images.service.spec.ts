import { TestBed } from '@angular/core/testing';

import { CarouselImagesService } from './carousel-images.service';

describe('CarouselImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarouselImagesService = TestBed.get(CarouselImagesService);
    expect(service).toBeTruthy();
  });
});
