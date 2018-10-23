import { TestBed } from '@angular/core/testing';

import { PlantdatasetService } from './plantdataset.service';

describe('PlantdatasetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantdatasetService = TestBed.get(PlantdatasetService);
    expect(service).toBeTruthy();
  });
});
