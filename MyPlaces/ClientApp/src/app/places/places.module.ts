import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { PlacesService } from '../services/places.service';

const routes: Routes = [
  { path: '', component: PlacesComponent }
];

@NgModule({
  declarations: [PlacesComponent],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    RouterModule.forChild(routes)
  ],
  providers: [PlacesService]
})
export class PlacesModule { }
