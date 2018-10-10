import { Component, OnInit } from '@angular/core';
import { PlantDataset } from '../plantdataset';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  plantDataset: PlantDataset = {
	  name: 'Simulated root images',
	  organ: 'root-system',
	  nrImgs: 10000,
	  groundtruth: 'yes',
	  homeLink: 'https://zenodo.org/record/61739'
  };
	
  constructor() { }

  ngOnInit() {
  }

}
