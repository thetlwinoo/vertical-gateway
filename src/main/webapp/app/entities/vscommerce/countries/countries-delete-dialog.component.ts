import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountries } from 'app/shared/model/vscommerce/countries.model';
import { CountriesService } from './countries.service';

@Component({
  templateUrl: './countries-delete-dialog.component.html',
})
export class CountriesDeleteDialogComponent {
  countries?: ICountries;

  constructor(protected countriesService: CountriesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.countriesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('countriesListModification');
      this.activeModal.close();
    });
  }
}
