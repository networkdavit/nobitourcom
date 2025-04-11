import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginRegComponent } from './dialog-login-reg.component';

describe('DialogLoginRegComponent', () => {
  let component: DialogLoginRegComponent;
  let fixture: ComponentFixture<DialogLoginRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLoginRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
