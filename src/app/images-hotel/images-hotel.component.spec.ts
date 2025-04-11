import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesHotelComponent } from './images-hotel.component';

describe('ImagesHotelComponent', () => {
  let component: ImagesHotelComponent;
  let fixture: ComponentFixture<ImagesHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
