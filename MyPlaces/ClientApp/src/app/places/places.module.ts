import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlacesService } from '../services/places.service';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { AddEditCityModalComponent } from './components/add-edit-city-modal/add-edit-city-modal.component';


const routes: Routes = [
  { path: '', component: PlacesComponent }
];

@NgModule({
  declarations: [PlacesComponent, AddEditCityModalComponent],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [PlacesService]
})
export class PlacesModule { }
