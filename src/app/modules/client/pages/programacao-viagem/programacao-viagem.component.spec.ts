import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacaoViagemComponent } from './programacao-viagem.component';

describe('ProgramacaoViagemComponent', () => {
  let component: ProgramacaoViagemComponent;
  let fixture: ComponentFixture<ProgramacaoViagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramacaoViagemComponent]
    });
    fixture = TestBed.createComponent(ProgramacaoViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
