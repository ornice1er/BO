import { TestBed } from '@angular/core/testing';

import { EtapePrestationStatusService } from './etape-prestation-status.service';

describe('EtapePrestationStatusService', () => {
  let service: EtapePrestationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtapePrestationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
