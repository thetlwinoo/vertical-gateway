import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestions } from 'app/shared/model/vscommerce/questions.model';
import { QuestionsService } from './questions.service';

@Component({
  templateUrl: './questions-delete-dialog.component.html',
})
export class QuestionsDeleteDialogComponent {
  questions?: IQuestions;

  constructor(protected questionsService: QuestionsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.questionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('questionsListModification');
      this.activeModal.close();
    });
  }
}
