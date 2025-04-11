import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRestaurantComponent } from './product-restaurant.component';

describe('ProductRestaurantComponent', () => {
  let component: ProductRestaurantComponent;
  let fixture: ComponentFixture<ProductRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
