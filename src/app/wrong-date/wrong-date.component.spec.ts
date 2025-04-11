import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongDateComponent } from './wrong-date.component';

describe('WrongDateComponent', () => {
  let component: WrongDateComponent;
  let fixture: ComponentFixture<WrongDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
