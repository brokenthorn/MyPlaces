import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PlacesService} from '../services/places.service';
import {AddEditCityModalContentComponent} from './components/add-edit-city-modal/add-edit-city-modal-content.component';
import {PlacesRoutingModule} from './places-routing.module';
import {PlacesComponent} from './places.component';


const routes: Routes = [
  {path: '', component: PlacesComponent}
];

@NgModule({
  declarations: [PlacesComponent, AddEditCityModalContentComponent],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [PlacesService]
})
export class PlacesModule {
}
