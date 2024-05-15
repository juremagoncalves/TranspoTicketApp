import { TestBed } from '@angular/core/testing';

import { ProgramacaoService } from './programacao.service';

describe('ProgramacaoService', () => {
  let service: ProgramacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
