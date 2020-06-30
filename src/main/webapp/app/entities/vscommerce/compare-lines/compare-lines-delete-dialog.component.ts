import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompareLines } from 'app/shared/model/vscommerce/compare-lines.model';
import { CompareLinesService } from './compare-lines.service';

@Component({
  templateUrl: './compare-lines-delete-dialog.component.html',
})
export class CompareLinesDeleteDialogComponent {
  compareLines?: ICompareLines;

  constructor(
    protected compareLinesService: CompareLinesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.compareLinesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('compareLinesListModification');
      this.activeModal.close();
    });
  }
}
