import { TestBed } from '@angular/core/testing';

import { MoviedbRequestsService } from './moviedb-requests.service';

describe('MoviedbRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviedbRequestsService = TestBed.get(MoviedbRequestsService);
    expect(service).toBeTruthy();
  });
});
