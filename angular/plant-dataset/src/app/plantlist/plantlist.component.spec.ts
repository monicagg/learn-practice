import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { PlantlistComponent } from './plantlist.component';

describe('PlantlistComponent', () => {
  let component: PlantlistComponent;
  let fixture: ComponentFixture<PlantlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantlistComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
