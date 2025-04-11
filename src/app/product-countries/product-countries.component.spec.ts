import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCountriesComponent } from './product-countries.component';

describe('ProductCountriesComponent', () => {
  let component: ProductCountriesComponent;
  let fixture: ComponentFixture<ProductCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
