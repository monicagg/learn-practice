import { Component, OnInit, Input } from '@angular/core';
import { PlantDataset } from '../plantdataset';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  @Input() plantDataset: PlantDataset;
	
  constructor() { }

  ngOnInit() {
  }

}
