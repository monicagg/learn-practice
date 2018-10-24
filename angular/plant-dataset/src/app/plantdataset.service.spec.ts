import { TestBed } from '@angular/core/testing';

import { PlantDatasetService } from './plantdataset.service';
import { DATASETS } from './plantdataset.service';

describe('PlantdatasetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantDatasetService = TestBed.get(PlantDatasetService);
    expect(service).toBeTruthy();
  });
  
  it('should return the datasets for test', () => {
	    const service: PlantDatasetService = TestBed.get(PlantDatasetService);
	    service.getAll().subscribe(
	    	datasets => expect(datasets).toEqual(DATASETS, 'expected datasets'),
	    	fail
	    	);
	  });
  
});
