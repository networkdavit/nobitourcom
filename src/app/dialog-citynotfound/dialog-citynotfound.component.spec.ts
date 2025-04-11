import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCitynotfoundComponent } from './dialog-citynotfound.component';

describe('DialogCitynotfoundComponent', () => {
  let component: DialogCitynotfoundComponent;
  let fixture: ComponentFixture<DialogCitynotfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCitynotfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCitynotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
