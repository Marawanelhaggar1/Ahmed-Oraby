import { TestBed } from '@angular/core/testing';

import { PicsServiceService } from './pics-service.service';

describe('PicsServiceService', () => {
  let service: PicsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
