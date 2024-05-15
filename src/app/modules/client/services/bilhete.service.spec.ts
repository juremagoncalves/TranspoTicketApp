import { TestBed } from '@angular/core/testing';

import { BilheteService } from './bilhete.service';

describe('BilheteService', () => {
  let service: BilheteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilheteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
