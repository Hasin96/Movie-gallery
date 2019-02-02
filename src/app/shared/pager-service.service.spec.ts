import { TestBed } from '@angular/core/testing';

import { PagerServiceService } from './pager-service.service';

describe('PagerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagerServiceService = TestBed.get(PagerServiceService);
    expect(service).toBeTruthy();
  });
});
