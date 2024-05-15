import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseServicoComponent } from './classe-servico.component';

describe('ClasseServicoComponent', () => {
  let component: ClasseServicoComponent;
  let fixture: ComponentFixture<ClasseServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseServicoComponent]
    });
    fixture = TestBed.createComponent(ClasseServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
