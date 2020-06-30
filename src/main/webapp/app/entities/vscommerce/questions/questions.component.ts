import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuestions } from 'app/shared/model/vscommerce/questions.model';
import { QuestionsService } from './questions.service';
import { QuestionsDeleteDialogComponent } from './questions-delete-dialog.component';

@Component({
  selector: 'jhi-questions',
  templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questions?: IQuestions[];
  eventSubscriber?: Subscription;

  constructor(
    protected questionsService: QuestionsService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.questionsService.query().subscribe((res: HttpResponse<IQuestions[]>) => (this.questions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQuestions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQuestions): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInQuestions(): void {
    this.eventSubscriber = this.eventManager.subscribe('questionsListModification', () => this.loadAll());
  }

  delete(questions: IQuestions): void {
    const modalRef = this.modalService.open(QuestionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.questions = questions;
  }
}
