import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IReviewLines } from 'app/shared/model/vscommerce/review-lines.model';

@Component({
  selector: 'jhi-review-lines-detail',
  templateUrl: './review-lines-detail.component.html',
})
export class ReviewLinesDetailComponent implements OnInit {
  reviewLines: IReviewLines | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reviewLines }) => (this.reviewLines = reviewLines));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
