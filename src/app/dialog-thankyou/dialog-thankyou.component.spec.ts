import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThankyouComponent } from './dialog-thankyou.component';

describe('DialogThankyouComponent', () => {
  let component: DialogThankyouComponent;
  let fixture: ComponentFixture<DialogThankyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogThankyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
