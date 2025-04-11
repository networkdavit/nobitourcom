import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSavesComponent } from './dialog-saves.component';

describe('DialogSavesComponent', () => {
  let component: DialogSavesComponent;
  let fixture: ComponentFixture<DialogSavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
