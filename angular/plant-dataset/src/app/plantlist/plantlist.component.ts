import { Component, OnInit, Input } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
	   debounceTime, distinctUntilChanged, switchMap, mergeMap
	 } from 'rxjs/operators';

import { PlantDataset } from '../plantdataset';
import { PlantDatasetService } from '../plantdataset.service';

@Component({
  selector: 'app-plantlist',
  templateUrl: './plantlist.component.html',
  styleUrls: ['./plantlist.component.css']
})
export class PlantlistComponent implements OnInit {
  
  datasets$: Observable<PlantDataset[]>;
  @Input() searchBy: string; 
  private searchTerms = new Subject<string>();
  selectedDataset: PlantDataset;

  constructor(private plantDatasetService: PlantDatasetService) { }

  ngOnInit() {
	  console.log('start ngOnInit');
	  this.searchBy = "title";
	  this.datasets$ = this.searchTerms.pipe(
      // wait 500ms after each keystroke before considering the term
      debounceTime(500),
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switchMap switch to new search observable each time the term changes
      switchMap((term: string) => this.plantDatasetService.search(this.searchBy, term))
      );
  }

  //Push a search term into the observable stream.
  search(term: string): void {
	console.log('plantlist component search term: ' + term);
    this.searchTerms.next(term);
  }
  
  onSelect(dataset: PlantDataset): void {
    this.selectedDataset = dataset;
  }
  
  onScroll() {
	console.log('scrolled!!');
  }
}
