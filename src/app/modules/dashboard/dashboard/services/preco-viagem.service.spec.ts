import { TestBed } from '@angular/core/testing';

import { PrecoViagemService } from './preco-viagem.service';

describe('PrecoViagemService', () => {
  let service: PrecoViagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecoViagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
