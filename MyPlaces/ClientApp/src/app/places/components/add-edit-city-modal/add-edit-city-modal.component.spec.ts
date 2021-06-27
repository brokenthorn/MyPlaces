import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEditCityModalComponent} from './add-edit-city-modal.component';

describe('AddEditCityModalComponent', () => {
  let component: AddEditCityModalComponent;
  let fixture: ComponentFixture<AddEditCityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditCityModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
