import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAmenitiesComponent } from './dialog-amenities.component';

describe('DialogAmenitiesComponent', () => {
  let component: DialogAmenitiesComponent;
  let fixture: ComponentFixture<DialogAmenitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAmenitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
