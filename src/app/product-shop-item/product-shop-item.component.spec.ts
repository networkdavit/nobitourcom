import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShopItemComponent } from './product-shop-item.component';

describe('ProductShopItemComponent', () => {
  let component: ProductShopItemComponent;
  let fixture: ComponentFixture<ProductShopItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShopItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
