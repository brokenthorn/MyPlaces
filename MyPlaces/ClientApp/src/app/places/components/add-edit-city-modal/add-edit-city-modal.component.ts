import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICityDto } from '../../../../models';
import { v4 } from 'uuid';

@Component({
  selector: 'app-add-edit-city-modal',
  templateUrl: './add-edit-city-modal.component.html',
  styleUrls: ['./add-edit-city-modal.component.css']
})
export class AddEditCityModalComponent {
  @Input() city?: ICityDto;
  @Input() modalId: string = "modal";

  @Output('save') saveEvent = new EventEmitter<ICityDto>();

  id = '';
  name = '';
  longitude = 0;
  latitude = 0;

  constructor() { }

  private resetFields() {
    this.id = '';
    this.name = '';
    this.longitude = 0;
    this.latitude = 0;
  }

  onSubmit(value: ICityDto) {
    value.id = v4();
    this.saveEvent.emit(value);
    this.resetFields();
  }
}
