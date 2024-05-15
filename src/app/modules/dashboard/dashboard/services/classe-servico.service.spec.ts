import { TestBed } from '@angular/core/testing';

import { ClasseServicoService } from './classe-servico.service';

describe('ClasseServicoService', () => {
  let service: ClasseServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasseServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
