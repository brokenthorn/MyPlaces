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
  @ViewChild('googleMapDiv') mapDiv: ElementRef<HTMLDivElement>;
  private gMap: google.maps.Map;

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
    PlacesComponent.loader.load().then(
      () => {
        this.gMap = new google.maps.Map(this.mapDiv.nativeElement, { zoom: 10 });

        const uluru = { lat: -25.344, lng: 131.036 };

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords: google.maps.LatLngLiteral = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            };

            this.gMap.setCenter(coords);
            new google.maps.Marker({ position: coords, map: this.gMap });
          },
          (geolocationError) => {
            console.error('The user did not approve getting his location, the map will focus on a default location.', geolocationError);

            this.gMap.setCenter(uluru);
            new google.maps.Marker({ position: uluru, map: this.gMap });
          });
      },
      (reason) => {
        this.mapDiv.nativeElement.innerHTML = `
          <div class="alert alert-danger" role="alert">
            <p>Nu s-a putut incarca harta Google Maps:</p>
            <p>${reason}</p>
          </div>
        `;
      }).catch(reason => {
        this.mapDiv.nativeElement.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <p>Eroare la incarcarea hartii Google Maps:</p>
          <p>${reason}</p>
        </div>
        `;
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
