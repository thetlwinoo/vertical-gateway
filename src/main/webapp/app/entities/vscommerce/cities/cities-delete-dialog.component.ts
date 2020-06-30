import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICities } from 'app/shared/model/vscommerce/cities.model';
import { CitiesService } from './cities.service';

@Component({
  templateUrl: './cities-delete-dialog.component.html',
})
export class CitiesDeleteDialogComponent {
  cities?: ICities;

  constructor(protected citiesService: CitiesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.citiesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('citiesListModification');
      this.activeModal.close();
    });
  }
}
