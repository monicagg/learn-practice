import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { newEvent } from '../../testing';

import { PlantlistComponent } from './plantlist.component';
import { PlantDatasetService } from '../plantdataset.service';
import { DATASETS } from '../plantdataset.service';

let component: PlantlistComponent;
let fixture: ComponentFixture<PlantlistComponent>;
let page: Page;

describe('PlantlistComponent', () => {

  beforeEach(async(() => {
	  TestBed.configureTestingModule({
	        declarations: [ PlantlistComponent ],
	        schemas: [ NO_ERRORS_SCHEMA ]
	      })
	  .compileComponents()
	  .then(createComponent);
  }));
  
  beforeEach(() => {
	  
  });
    
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have no rows', () => {
	expect(page.rows.length).toBe(0);
  });
	  
  it('1st row should match first datasets element', fakeAsync(() => {
	  const expectedDataset = DATASETS[0];
	  const searchTerm = 'image';
	  page.searchInput.value = searchTerm;
	  // dispatch a DOM event so that Angular learns of input value change.
	  //Didn't work for keyup event, only if changed to click
	  //page.searchInput.dispatchEvent(newEvent('input')); // tell Angular 
	  page.searchInputDe.triggerEventHandler('keyup', null);
	  
	  fixture.detectChanges(); //update view
	  // Wait for the debounceTime(500)
      tick(500);
      //console.log('test rows after tick 500');
	  fixture.whenStable().then(() => {
		  fixture.detectChanges(); //update view
		  const actualDataset = page.rows.length==0?null:page.rows[0].textContent;
		  expect(actualDataset).toContain(expectedDataset.nrImgs.toString(), 'nrImgs');
		  expect(actualDataset).toContain(expectedDataset.name, 'name');
	  });
  }));
});

/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(PlantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
    	fixture.detectChanges();
    	page = new Page();
    });
}

class Page {
	/** line elements */
	get rows(): HTMLElement[] { return this.queryAll<HTMLElement>('li');}
	
	get searchInput(): HTMLInputElement {
		return fixture.debugElement.query(By.css('input')).nativeElement;
	}
	
	get searchInputDe(): DebugElement {
		return fixture.debugElement.query(By.css('input'));
	}
	
	////query helpers ////
	private query<T>(selector: string): T {
		return fixture.debugElement.nativeElement.querySelector(selector);
	}
	private queryAll<T>(selector: string): T[] {
		return fixture.debugElement.nativeElement.querySelectorAll(selector);
	}
}