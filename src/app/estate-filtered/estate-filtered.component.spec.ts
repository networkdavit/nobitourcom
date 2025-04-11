import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateFilteredComponent } from './estate-filtered.component';

describe('EstateFilteredComponent', () => {
  let component: EstateFilteredComponent;
  let fixture: ComponentFixture<EstateFilteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateFilteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
