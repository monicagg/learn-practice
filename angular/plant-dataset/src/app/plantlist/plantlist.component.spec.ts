import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { asyncData, newEvent } from '../../testing';

import { of, throwError } from 'rxjs';

import { PlantlistComponent } from './plantlist.component';
import { PlantDatasetService } from '../plantdataset.service';
import { DATASETS } from '../plantdataset.service';

let component: PlantlistComponent;
let fixture: ComponentFixture<PlantlistComponent>;
let searchSpy: jasmine.Spy;
let page: Page;

describe('PlantlistComponent', () => {

  beforeEach(() => {
	// Create a fake service object with a `method` spy
    const plantDatasetServiceSpy = jasmine.createSpyObj('PlantDatasetService', ['search']);
    // Make the spy return a synchronous Observable with the test data
    searchSpy = plantDatasetServiceSpy.search.and.returnValue( asyncData(DATASETS) );
	  
    TestBed.configureTestingModule({
        declarations: [ PlantlistComponent ],
        providers: [ { provide: PlantDatasetService, useValue: plantDatasetServiceSpy } ],
        schemas: [ NO_ERRORS_SCHEMA ]
      });
      
    fixture = TestBed.createComponent(PlantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
    	fixture.detectChanges();
    	page = new Page();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have no rows', () => {
	expect(page.rows.length).toBe(0);
  });
	  
  it('1st row should match first datasets element', fakeAsync(() => {
	  const expectedDataset = DATASETS[0];
	  page.searchInput.value = 'image';
	  // dispatch a DOM event so that Angular learns of input value change.
	  page.searchInput.dispatchEvent(newEvent('input')); // tell Angular
	  // Tell Angular to update the display
	  fixture.detectChanges(); // ngOnInit()
	  tick();
	  fixture.whenStable().then(() => {
		  fixture.detectChanges(); //update view
		  const lrows = fixture.debugElement.nativeElement.querySelectorAll('li');
		  expect(lrows.length).toBe(2);
		  const actualDataset = page.rows.length==0?null:page.rows[0].textContent;
		  expect(actualDataset).toContain(expectedDataset.nrImgs.toString(), 'nrImgs');
		  expect(actualDataset).toContain(expectedDataset.name, 'name');
	  });
  }));
});

class Page {
	/** line elements */
	get rows() { return this.queryAll<HTMLElement>('li');}
	
	get searchInput()   { return this.query<HTMLInputElement>('input');}
	////query helpers ////
	private query<T>(selector: string): T {
		return fixture.debugElement.nativeElement.querySelector(selector);
	}
	private queryAll<T>(selector: string): T[] {
		return fixture.debugElement.nativeElement.querySelectorAll(selector);
	}
}