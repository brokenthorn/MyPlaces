import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ICityDto} from '../../../../models';

@Component({
  selector: 'app-add-edit-city-modal-content',
  templateUrl: './add-edit-city-modal-content.component.html'
})
export class AddEditCityModalContentComponent implements OnInit {
  @Input() city: ICityDto;
  @Input() title: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  submit(value: ICityDto) {
    this.activeModal.dismiss('Submit click');
  }
}
