import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdventureComponent } from './product-adventure.component';

describe('ProductAdventureComponent', () => {
  let component: ProductAdventureComponent;
  let fixture: ComponentFixture<ProductAdventureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAdventureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
