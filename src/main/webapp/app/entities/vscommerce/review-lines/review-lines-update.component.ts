import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IReviewLines, ReviewLines } from 'app/shared/model/vscommerce/review-lines.model';
import { ReviewLinesService } from './review-lines.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';
import { IReviews } from 'app/shared/model/vscommerce/reviews.model';
import { ReviewsService } from 'app/entities/vscommerce/reviews/reviews.service';

type SelectableEntity = IPhotos | IReviews;

@Component({
  selector: 'jhi-review-lines-update',
  templateUrl: './review-lines-update.component.html',
})
export class ReviewLinesUpdateComponent implements OnInit {
  isSaving = false;
  photos: IPhotos[] = [];
  reviews: IReviews[] = [];

  editForm = this.fb.group({
    id: [],
    stockItemRating: [],
    stockItemReview: [],
    attachedUrl: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    reviewImageId: [],
    reviewId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected reviewLinesService: ReviewLinesService,
    protected photosService: PhotosService,
    protected reviewsService: ReviewsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reviewLines }) => {
      if (!reviewLines.id) {
        const today = moment().startOf('day');
        reviewLines.lastEditedWhen = today;
      }

      this.updateForm(reviewLines);

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));

      this.reviewsService.query().subscribe((res: HttpResponse<IReviews[]>) => (this.reviews = res.body || []));
    });
  }

  updateForm(reviewLines: IReviewLines): void {
    this.editForm.patchValue({
      id: reviewLines.id,
      stockItemRating: reviewLines.stockItemRating,
      stockItemReview: reviewLines.stockItemReview,
      attachedUrl: reviewLines.attachedUrl,
      lastEditedBy: reviewLines.lastEditedBy,
      lastEditedWhen: reviewLines.lastEditedWhen ? reviewLines.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      reviewImageId: reviewLines.reviewImageId,
      reviewId: reviewLines.reviewId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reviewLines = this.createFromForm();
    if (reviewLines.id !== undefined) {
      this.subscribeToSaveResponse(this.reviewLinesService.update(reviewLines));
    } else {
      this.subscribeToSaveResponse(this.reviewLinesService.create(reviewLines));
    }
  }

  private createFromForm(): IReviewLines {
    return {
      ...new ReviewLines(),
      id: this.editForm.get(['id'])!.value,
      stockItemRating: this.editForm.get(['stockItemRating'])!.value,
      stockItemReview: this.editForm.get(['stockItemReview'])!.value,
      attachedUrl: this.editForm.get(['attachedUrl'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      reviewImageId: this.editForm.get(['reviewImageId'])!.value,
      reviewId: this.editForm.get(['reviewId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReviewLines>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
