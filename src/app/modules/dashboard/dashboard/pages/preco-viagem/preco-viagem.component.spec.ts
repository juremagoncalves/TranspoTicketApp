import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecoViagemComponent } from './preco-viagem.component';

describe('PrecoViagemComponent', () => {
  let component: PrecoViagemComponent;
  let fixture: ComponentFixture<PrecoViagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecoViagemComponent]
    });
    fixture = TestBed.createComponent(PrecoViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
