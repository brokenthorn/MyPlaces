import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ICityDto, IGMPlaceDto } from '../../models';

//import { v4, validate as validateGuid } from 'uuid';

@Injectable()
export class PlacesService {
  public cities: ICityDto[] = [];
  public gmPlaces: IGMPlaceDto[] = [];

  private isRefreshing: boolean = false;

  constructor(private http: HttpClient) {}

  public refreshAll(done: (() => void) | null = null) {
    if (this.isRefreshing) {
      console.warn('Another refresh of all data in PlacesService is already in progress!');

      if (done != null) done();

      return;
    }

    console.log('Refreshing all data in PlacesService...');

    this.isRefreshing = true;

    var refreshTask$ = forkJoin({
      places: this.http.get<IGMPlaceDto[]>('/api/gmplaces'),
      cities: this.http.get<ICityDto[]>('/api/cities'),
    });

    refreshTask$.subscribe(value => {
      this.isRefreshing = false;

      this.gmPlaces = value.places;
      this.cities = value.cities;

      console.log('Refreshing all data in PlacesService completed.');
      console.log('Refreshing all data in PlacesService returned this value:', value);

      if (done != null) done();
    }, error => {
      console.error('Error while refreshing all data in PlacesService', error);

      if (done != null) done();
    });
  }
}
