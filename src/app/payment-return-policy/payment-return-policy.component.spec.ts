import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReturnPolicyComponent } from './payment-return-policy.component';

describe('PaymentReturnPolicyComponent', () => {
  let component: PaymentReturnPolicyComponent;
  let fixture: ComponentFixture<PaymentReturnPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReturnPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
