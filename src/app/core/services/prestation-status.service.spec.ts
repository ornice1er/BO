import { TestBed } from '@angular/core/testing';

import { PrestationStatusService } from './prestation-status.service';

describe('PrestationStatusService', () => {
  let service: PrestationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
