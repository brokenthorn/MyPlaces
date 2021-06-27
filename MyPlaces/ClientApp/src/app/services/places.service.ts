import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin} from 'rxjs';
import {ICityDto, IGMPlaceDto} from '../../models';

@Injectable()
export class PlacesService {
  public cities: ICityDto[] = [];
  public gmPlaces: IGMPlaceDto[] = [];

  private isRefreshing = false;

  constructor(private http: HttpClient) {
  }

  public refreshAll(done: (() => void) = null) {
    if (this.isRefreshing) {
      console.warn('Another refresh of all data in PlacesService is already in progress!');

      if (done != null) {
        done();
      }

      return;
    }

    this.isRefreshing = true;

    const refreshTask$ = forkJoin({
      places: this.http.get<IGMPlaceDto[]>('/api/gmplaces'),
      cities: this.http.get<ICityDto[]>('/api/cities'),
    });

    refreshTask$.subscribe(value => {
      this.isRefreshing = false;

      this.gmPlaces.length = 0;
      value.places.forEach(newPlace => this.gmPlaces.push(newPlace));

      this.cities.length = 0;
      value.cities.forEach(newCity => this.cities.push(newCity));

      if (done != null) {
        done();
      }
    }, error => {
      console.error('Error while refreshing all data in PlacesService', error);

      if (done != null) {
        done();
      }
    });
  }

  public addCity(city: ICityDto, done: ((city: ICityDto, error: any) => void) = null) {
    this.http.post<ICityDto>('/api/cities', city).subscribe(responseCity => {
      this.cities.push(responseCity);

      if (done != null) {
        done(responseCity, null);
      }
    }, error => {
      console.error('Error while adding new city', error);

      if (done != null) {
        done(null, error);
      }
    });
  }

  public updateCity(city: ICityDto, done: ((city: ICityDto, error: any) => void) = null) {
    const foundAtIndex = this.cities.findIndex(c => c.id === city.id);

    if (foundAtIndex === -1) {
      if (done != null) {
        done(null, `City with ID=${city.id} not found locally so will not update it. Try refreshing the local cache and try again.`);
      }
    } else {
      this.http.put(`/api/cities/${city.id}`, city).subscribe(() => {
        this.cities.splice(foundAtIndex, 1, city);

        if (done != null) {
          done(city, null);
        }
      }, error => {
        console.log('Error while updating a city', error);

        if (done != null) {
          done(null, error);
        }
      });
    }
  }
}
