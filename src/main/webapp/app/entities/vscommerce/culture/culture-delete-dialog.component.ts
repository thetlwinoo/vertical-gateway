import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICulture } from 'app/shared/model/vscommerce/culture.model';
import { CultureService } from './culture.service';

@Component({
  templateUrl: './culture-delete-dialog.component.html',
})
export class CultureDeleteDialogComponent {
  culture?: ICulture;

  constructor(protected cultureService: CultureService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cultureService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cultureListModification');
      this.activeModal.close();
    });
  }
}
