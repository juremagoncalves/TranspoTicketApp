import { TestBed } from '@angular/core/testing';

import { ProgramacaoDataServiceService } from './programacao-data-service.service';

describe('ProgramacaoDataServiceService', () => {
  let service: ProgramacaoDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacaoDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
