import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Loader} from '@googlemaps/js-api-loader';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ICityDto, IGMPlaceDto} from '../../models';
import {PlacesService} from '../services/places.service';
import {v4} from 'uuid';
import {AddEditCityModalContentComponent} from './components/add-edit-city-modal/add-edit-city-modal-content.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit, AfterViewInit {
  private static readonly ZoomToCityLevel = 10;

  // WARNING: Remember to restrict the origin of API calls for this API key, otherwise unwanted charges could be incurred!
  private static readonly loader = new Loader({
    apiKey: 'AIzaSyDygzHfAI2-uBpKKHKZu-q8ucqOCx1sokU',
    version: 'weekly',
    language: 'ro',
    libraries: ['places']
  });

  @ViewChild('googleMapDiv') mapDiv: ElementRef<HTMLDivElement>;

  isRefreshing = false;
  showAddEditCityModal = false;
  isMaximized = false;

  selectedCity: ICityDto;
  selectedPlace: IGMPlaceDto;

  cities: ICityDto[] = [];
  places: IGMPlaceDto[] = [];

  private gMap: google.maps.Map;
  private gPlacesService: google.maps.places.PlacesService;
  private gMarkers: google.maps.Marker[] = [];

  constructor(private placesService: PlacesService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    // this sets by reference once so use the service to add/remove items!
    this.cities = this.placesService.cities;
    this.places = this.placesService.gmPlaces;

    this.refreshAll();
  }

  ngAfterViewInit(): void {
    PlacesComponent.loader.load().then(
      () => {
        this.gMap = new google.maps.Map(this.mapDiv.nativeElement, {zoom: PlacesComponent.ZoomToCityLevel});
        this.gPlacesService = new google.maps.places.PlacesService(this.gMap);

        this.resetMapPositionToDefault();
      },
      (reason) => {
        this.mapDiv.nativeElement.innerHTML = `
          <div class="alert alert-danger" role="alert">
            <p>Nu s-a putut incarca harta Google Maps:</p>
            <p>${reason}</p>
          </div>
        `;
      })
      .catch(reason => {
        this.mapDiv.nativeElement.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <p>Eroare la incarcarea hartii Google Maps:</p>
          <p>${reason}</p>
        </div>
        `;
      });
  }

  private resetMapPositionToDefault() {
    const uluru = {lat: -25.344, lng: 131.036};

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: google.maps.LatLngLiteral = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        this.gMap.setCenter(coords);
        this.createMapMarker(coords);
      },
      (geolocationError) => {
        console.error('The user did not approve getting his location, the map will focus on a default location.', geolocationError);

        this.gMap.setCenter(uluru);
        this.createMapMarker(uluru);
      });
  }

  refreshAll() {
    this.isRefreshing = true;

    this.placesService.refreshAll(() => this.isRefreshing = false);
    this.selectCity(null);
    this.resetMapPositionToDefault();
  }

  selectCity(city: ICityDto) {
    if (city == null) {
      this.clearMapMarkers();

      this.selectedCity = null;
      this.selectPlace(null);

      return;
    }

    this.selectedCity = city;
    this.selectPlace(null);

    this.clearMapMarkers();

    this.gPlacesService.findPlaceFromQuery(
      {query: this.selectedCity.name, fields: ['name', 'geometry']},
      (results, status) => {
        console.log('Show search results on the map');

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            this.createMapMarker(results[i].geometry.location);
          }
          this.gMap.setCenter(results[0].geometry.location);
        }
      }
    );
  }

  selectPlace(place: IGMPlaceDto) {
    this.selectedPlace = place;
  }

  onAddCityClick() {
    this.showAddEditCityModal = true;
  }

  toggleMapSize() {
    this.isMaximized = !this.isMaximized;
  }

  private addNewCity(city: ICityDto) {
    this.placesService.addCity(city, (newCity, error) => {
      if (!newCity) {
        alert(`Nu am putut salva orașul: ${error}`);
      } else {
        this.selectCity(newCity);
      }
    });
  }

  private updateCity(city: ICityDto) {
    this.placesService.updateCity(city, (updatedCity, error) => {
      if (!updatedCity) {
        alert(`Nu am putut actualiza orașul: ${error}`);
      } else {
        this.selectCity(updatedCity);
      }
    });
  }

  onModalSave(city: ICityDto) {
    if (city.id === '') {
      city.id = v4();
      this.addNewCity(city);
    } else {
      this.updateCity(city);
    }
  }

  private createMapMarker(pos: google.maps.LatLngLiteral | google.maps.LatLng) {
    if (this.gMap != null) {
      this.gMarkers.push(new google.maps.Marker({position: pos, map: this.gMap}));
    } else {
      console.warn('Cannot create a map marker, no Google Map loaded');
    }
  }

  private clearMapMarkers() {
    this.gMarkers.forEach(marker => marker.setMap(null));
    this.gMarkers.length = 0;
  }

  showModalForAdd() {
    const modalRef = this.modalService.open(AddEditCityModalContentComponent);
    modalRef.componentInstance.title = 'Oraș nou';
  }

  showModalForEdit() {
    const modalRef = this.modalService.open(AddEditCityModalContentComponent);
    modalRef.componentInstance.title = this.selectedCity.name;
    modalRef.componentInstance.city = this.selectedCity;
  }
}
