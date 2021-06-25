import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ICityDto, IGMPlaceDto } from '../../models';

//import { v4, validate as validateGuid } from 'uuid';

@Injectable()
export class PlacesService {
  public cities: ICityDto[] = [];
  public gmPlaces: IGMPlaceDto[] = [];

  private isRefreshing: boolean = false;

  constructor(private http: HttpClient) {
    this.refreshAll();
  }

  public refreshAll() {
    if (this.isRefreshing) {
      console.warn('Another refresh of all data in PlacesService is already in progress!');
      return;
    }

    console.log('Refreshing all data in PlacesService...');

    this.isRefreshing = true;

    forkJoin({
      places: this.http.get<IGMPlaceDto[]>('/api/gmplaces'),
      cities: this.http.get<ICityDto[]>('/api/cities'),
    }).subscribe(value => {
      this.isRefreshing = false;
      this.gmPlaces = value.places;
      this.cities = value.cities;

      console.log('Refreshing all data in PlacesService completed.');
      console.log('Refreshing all data in PlacesService returned this value:', value);
    }, error => {
      console.error('Error while refreshing all data in PlacesService', error);
    });
  }
}
