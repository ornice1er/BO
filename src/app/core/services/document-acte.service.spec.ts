import { TestBed } from '@angular/core/testing';

import { DocumentActeService } from './document-acte.service';

describe('DocumentActeService', () => {
  let service: DocumentActeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentActeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
