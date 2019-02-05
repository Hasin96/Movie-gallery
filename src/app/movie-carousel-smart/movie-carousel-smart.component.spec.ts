import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCarouselSmartComponent } from './movie-carousel-smart.component';

describe('MovieCarouselSmartComponent', () => {
  let component: MovieCarouselSmartComponent;
  let fixture: ComponentFixture<MovieCarouselSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCarouselSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCarouselSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
