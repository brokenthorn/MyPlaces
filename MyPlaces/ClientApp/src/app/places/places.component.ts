import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.refreshAll();
  }

  public refreshAll() {
    this.placesService.refreshAll();
  }
}
