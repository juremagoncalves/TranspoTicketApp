import { TestBed } from '@angular/core/testing';

import { AssentoService } from './assento.service';

describe('AssentoService', () => {
  let service: AssentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
