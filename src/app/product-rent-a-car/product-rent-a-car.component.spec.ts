import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRentACarComponent } from './product-rent-a-car.component';

describe('ProductRentACarComponent', () => {
  let component: ProductRentACarComponent;
  let fixture: ComponentFixture<ProductRentACarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRentACarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRentACarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
