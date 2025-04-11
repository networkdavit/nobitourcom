import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelImageDialogComponent } from './hotel-image-dialog.component';

describe('HotelImageDialogComponent', () => {
  let component: HotelImageDialogComponent;
  let fixture: ComponentFixture<HotelImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
