import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLanguagesComponent } from './dialog-languages.component';

describe('DialogLanguagesComponent', () => {
  let component: DialogLanguagesComponent;
  let fixture: ComponentFixture<DialogLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
