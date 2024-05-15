import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarViagensComponent } from './pesquisar-viagens.component';

describe('PesquisarViagensComponent', () => {
  let component: PesquisarViagensComponent;
  let fixture: ComponentFixture<PesquisarViagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PesquisarViagensComponent]
    });
    fixture = TestBed.createComponent(PesquisarViagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
