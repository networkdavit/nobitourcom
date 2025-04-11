import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCityComponent } from './product-city.component';

describe('ProductCityComponent', () => {
  let component: ProductCityComponent;
  let fixture: ComponentFixture<ProductCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
