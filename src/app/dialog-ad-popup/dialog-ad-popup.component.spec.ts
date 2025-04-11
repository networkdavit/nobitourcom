import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdPopupComponent } from './dialog-ad-popup.component';

describe('DialogAdPopupComponent', () => {
  let component: DialogAdPopupComponent;
  let fixture: ComponentFixture<DialogAdPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
