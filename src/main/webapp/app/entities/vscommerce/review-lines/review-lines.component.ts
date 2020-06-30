import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReviewLines } from 'app/shared/model/vscommerce/review-lines.model';
import { ReviewLinesService } from './review-lines.service';
import { ReviewLinesDeleteDialogComponent } from './review-lines-delete-dialog.component';

@Component({
  selector: 'jhi-review-lines',
  templateUrl: './review-lines.component.html',
})
export class ReviewLinesComponent implements OnInit, OnDestroy {
  reviewLines?: IReviewLines[];
  eventSubscriber?: Subscription;

  constructor(
    protected reviewLinesService: ReviewLinesService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.reviewLinesService.query().subscribe((res: HttpResponse<IReviewLines[]>) => (this.reviewLines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReviewLines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReviewLines): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInReviewLines(): void {
    this.eventSubscriber = this.eventManager.subscribe('reviewLinesListModification', () => this.loadAll());
  }

  delete(reviewLines: IReviewLines): void {
    const modalRef = this.modalService.open(ReviewLinesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reviewLines = reviewLines;
  }
}
