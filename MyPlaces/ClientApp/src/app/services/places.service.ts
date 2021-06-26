import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ICityDto, IGMPlaceDto } from '../../models';

@Injectable()
export class PlacesService {
  public cities: ICityDto[] = [];
  public gmPlaces: IGMPlaceDto[] = [];

  private isRefreshing: boolean = false;

  constructor(private http: HttpClient) {}

  public refreshAll(done: (() => void) = null) {
    if (this.isRefreshing) {
      console.warn('Another refresh of all data in PlacesService is already in progress!');

      if (done != null) done();

      return;
    }

    this.isRefreshing = true;

    var refreshTask$ = forkJoin({
      places: this.http.get<IGMPlaceDto[]>('/api/gmplaces'),
      cities: this.http.get<ICityDto[]>('/api/cities'),
    });

    refreshTask$.subscribe(value => {
      this.isRefreshing = false;

      this.gmPlaces = value.places;
      this.cities = value.cities;

      if (done != null) done();
    }, error => {
      console.error('Error while refreshing all data in PlacesService', error);

      if (done != null) done();
    });
  }

  public addCity(city: ICityDto, done: ((city: ICityDto, error: any) => void) = null) {
    console.log('Adding a new city');

    this.http.post<ICityDto>('/api/cities', city).subscribe(responseCity => {
      this.cities.push(responseCity);

      if (done != null) done(responseCity, null);
    }, error => {
      console.error('Error while adding new city', error);

      if (done != null) done(null, error);
    });
  }
}
