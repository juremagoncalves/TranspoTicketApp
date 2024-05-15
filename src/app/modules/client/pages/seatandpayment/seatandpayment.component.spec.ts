import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatandpaymentComponent } from './seatandpayment.component';

describe('SeatandpaymentComponent', () => {
  let component: SeatandpaymentComponent;
  let fixture: ComponentFixture<SeatandpaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatandpaymentComponent]
    });
    fixture = TestBed.createComponent(SeatandpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
