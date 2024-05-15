import { TestBed } from '@angular/core/testing';

import { ReservaTemporariaService } from './reserva-temporaria.service';

describe('ReservaTemporariaService', () => {
  let service: ReservaTemporariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaTemporariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
