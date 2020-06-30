import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IReviews, Reviews } from 'app/shared/model/vscommerce/reviews.model';
import { ReviewsService } from './reviews.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-reviews-update',
  templateUrl: './reviews-update.component.html',
})
export class ReviewsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    customerName: [],
    emailAddress: [null, [Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    reviewDate: [],
    sellerRating: [],
    sellerReview: [],
    deliveryRating: [],
    deliveryReview: [],
    reviewAsAnonymous: [],
    completedReview: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected reviewsService: ReviewsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reviews }) => {
      if (!reviews.id) {
        const today = moment().startOf('day');
        reviews.reviewDate = today;
        reviews.lastEditedWhen = today;
      }

      this.updateForm(reviews);
    });
  }

  updateForm(reviews: IReviews): void {
    this.editForm.patchValue({
      id: reviews.id,
      customerName: reviews.customerName,
      emailAddress: reviews.emailAddress,
      reviewDate: reviews.reviewDate ? reviews.reviewDate.format(DATE_TIME_FORMAT) : null,
      sellerRating: reviews.sellerRating,
      sellerReview: reviews.sellerReview,
      deliveryRating: reviews.deliveryRating,
      deliveryReview: reviews.deliveryReview,
      reviewAsAnonymous: reviews.reviewAsAnonymous,
      completedReview: reviews.completedReview,
      lastEditedBy: reviews.lastEditedBy,
      lastEditedWhen: reviews.lastEditedWhen ? reviews.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
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
    const reviews = this.createFromForm();
    if (reviews.id !== undefined) {
      this.subscribeToSaveResponse(this.reviewsService.update(reviews));
    } else {
      this.subscribeToSaveResponse(this.reviewsService.create(reviews));
    }
  }

  private createFromForm(): IReviews {
    return {
      ...new Reviews(),
      id: this.editForm.get(['id'])!.value,
      customerName: this.editForm.get(['customerName'])!.value,
      emailAddress: this.editForm.get(['emailAddress'])!.value,
      reviewDate: this.editForm.get(['reviewDate'])!.value ? moment(this.editForm.get(['reviewDate'])!.value, DATE_TIME_FORMAT) : undefined,
      sellerRating: this.editForm.get(['sellerRating'])!.value,
      sellerReview: this.editForm.get(['sellerReview'])!.value,
      deliveryRating: this.editForm.get(['deliveryRating'])!.value,
      deliveryReview: this.editForm.get(['deliveryReview'])!.value,
      reviewAsAnonymous: this.editForm.get(['reviewAsAnonymous'])!.value,
      completedReview: this.editForm.get(['completedReview'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReviews>>): void {
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
}
