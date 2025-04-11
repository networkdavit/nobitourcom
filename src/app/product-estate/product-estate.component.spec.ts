import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEstateComponent } from './product-estate.component';

describe('ProductEstateComponent', () => {
  let component: ProductEstateComponent;
  let fixture: ComponentFixture<ProductEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
