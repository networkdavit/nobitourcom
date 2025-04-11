import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewImagesComponent } from './dialog-view-images.component';

describe('DialogViewImagesComponent', () => {
  let component: DialogViewImagesComponent;
  let fixture: ComponentFixture<DialogViewImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogViewImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
