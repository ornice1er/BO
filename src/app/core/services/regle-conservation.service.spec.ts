import { TestBed } from '@angular/core/testing';

import { RegleConservationService } from './regle-conservation.service';

describe('RegleConservationService', () => {
  let service: RegleConservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegleConservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
