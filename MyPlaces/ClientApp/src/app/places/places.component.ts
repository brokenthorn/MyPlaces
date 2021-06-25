import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ICityDto, IGMPlaceDto } from '../../models';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMap') map: ElementRef<HTMLDivElement>;

  // WARNING: Remember to restrict the origin of API calls for this API key, otherwise unwanted charges could be incurred!
  private static loader = new Loader({
    apiKey: "AIzaSyDygzHfAI2-uBpKKHKZu-q8ucqOCx1sokU",
    version: "weekly"
  });

  isRefreshing: boolean = false;

  selectedCity: ICityDto | null = null;
  selectedPlace: IGMPlaceDto | null = null;

  cities: ICityDto[] = [];
  places: IGMPlaceDto[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit(): void {
    this.refreshAll();
  }

  ngAfterViewInit(): void {
    console.log('Map is set to', this.map);

    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };

    PlacesComponent.loader.load().then(() => {
      let googleMap = new google.maps.Map(this.map.nativeElement, {
        center: uluru,
        zoom: 4,
      });

      // The marker, positioned at Uluru
      const marker = new google.maps.Marker({
        position: uluru,
        map: googleMap,
      });
    });
  }

  refreshAll() {
    this.isRefreshing = true;

    this.placesService.refreshAll(() => {
      this.isRefreshing = false;

      this.cities = this.placesService.cities;
      this.places = this.placesService.gmPlaces;

      this.selectedCity = this.cities[0];
    });
  }

  onSelectedCityChange(selectedCity: ICityDto) {
    this.selectedCity = selectedCity;
  }

  onSelectedPlaceChange(selectedPlace: IGMPlaceDto) {
    this.selectedPlace = selectedPlace;
  }
}
