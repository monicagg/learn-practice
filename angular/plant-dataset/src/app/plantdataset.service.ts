import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { PlantDataset } from './plantdataset';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PlantDatasetService {

  constructor(private messagesService: MessagesService) { }
  
  getAll(): Observable<PlantDataset[]> {
	  this.messagesService.add('PlantDatasetService: fetched datasets');
	  return of(DATASETS);
  } 
  
  search(propName: string, propValue: string): Observable<PlantDataset[]> {
	  this.messagesService.add('PlantDatasetService: filter by ' + propName + ' starts with ' + propValue);
	  let regexpr = new RegExp('\\b' + propValue.toString() + '[^\\b]*?\\b', 'i');
	  const results = DATASETS.filter(dataset => regexpr.exec(dataset[propName].toString()));
	  this.messagesService.add('PlantDatasetService: filter ' + regexpr.toString() + ' results ' + results.length);
	  return of(results);
  }
  
}

export const DATASETS: PlantDataset[] = [
	{
		  name: 'Simulated root images',
		  organ: 'root-system',
		  nrImgs: 10000,
		  groundtruth: 'yes',
		  homeLink: 'https://zenodo.org/record/61739'
	  },
	  {
		  name: 'Simulated root images 2',
		  organ: 'root-system',
		  nrImgs: 10200,
		  groundtruth: 'no',
		  homeLink: 'https://onu.org/record/61739'
	  }
]