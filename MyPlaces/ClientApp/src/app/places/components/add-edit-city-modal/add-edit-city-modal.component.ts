import { Component, Input, OnInit } from '@angular/core';
import { ICityDto } from '../../../../models';

@Component({
  selector: 'app-add-edit-city-modal',
  templateUrl: './add-edit-city-modal.component.html',
  styleUrls: ['./add-edit-city-modal.component.css']
})
export class AddEditCityModalComponent implements OnInit {
  @Input() city?: ICityDto;
  @Input() modalId: string = "modal";

  constructor() { }

  ngOnInit(): void {
  }
}
