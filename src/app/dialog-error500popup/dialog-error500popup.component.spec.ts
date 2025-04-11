import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogError500popupComponent } from './dialog-error500popup.component';

describe('DialogError500popupComponent', () => {
  let component: DialogError500popupComponent;
  let fixture: ComponentFixture<DialogError500popupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogError500popupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogError500popupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
