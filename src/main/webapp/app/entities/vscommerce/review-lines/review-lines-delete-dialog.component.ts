import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReviewLines } from 'app/shared/model/vscommerce/review-lines.model';
import { ReviewLinesService } from './review-lines.service';

@Component({
  templateUrl: './review-lines-delete-dialog.component.html',
})
export class ReviewLinesDeleteDialogComponent {
  reviewLines?: IReviewLines;

  constructor(
    protected reviewLinesService: ReviewLinesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reviewLinesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reviewLinesListModification');
      this.activeModal.close();
    });
  }
}
