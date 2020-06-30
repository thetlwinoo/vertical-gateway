import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPhotos, Photos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from './photos.service';

@Component({
  selector: 'jhi-photos-update',
  templateUrl: './photos-update.component.html',
})
export class PhotosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    blobId: [],
    thumbnailUrl: [null, [Validators.required]],
    originalUrl: [null, [Validators.required]],
    bannerTallUrl: [],
    bannerWideUrl: [],
    circleUrl: [],
    sharpenedUrl: [],
    squareUrl: [],
    watermarkUrl: [],
    priority: [],
    defaultInd: [null, [Validators.required]],
  });

  constructor(protected photosService: PhotosService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ photos }) => {
      this.updateForm(photos);
    });
  }

  updateForm(photos: IPhotos): void {
    this.editForm.patchValue({
      id: photos.id,
      blobId: photos.blobId,
      thumbnailUrl: photos.thumbnailUrl,
      originalUrl: photos.originalUrl,
      bannerTallUrl: photos.bannerTallUrl,
      bannerWideUrl: photos.bannerWideUrl,
      circleUrl: photos.circleUrl,
      sharpenedUrl: photos.sharpenedUrl,
      squareUrl: photos.squareUrl,
      watermarkUrl: photos.watermarkUrl,
      priority: photos.priority,
      defaultInd: photos.defaultInd,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const photos = this.createFromForm();
    if (photos.id !== undefined) {
      this.subscribeToSaveResponse(this.photosService.update(photos));
    } else {
      this.subscribeToSaveResponse(this.photosService.create(photos));
    }
  }

  private createFromForm(): IPhotos {
    return {
      ...new Photos(),
      id: this.editForm.get(['id'])!.value,
      blobId: this.editForm.get(['blobId'])!.value,
      thumbnailUrl: this.editForm.get(['thumbnailUrl'])!.value,
      originalUrl: this.editForm.get(['originalUrl'])!.value,
      bannerTallUrl: this.editForm.get(['bannerTallUrl'])!.value,
      bannerWideUrl: this.editForm.get(['bannerWideUrl'])!.value,
      circleUrl: this.editForm.get(['circleUrl'])!.value,
      sharpenedUrl: this.editForm.get(['sharpenedUrl'])!.value,
      squareUrl: this.editForm.get(['squareUrl'])!.value,
      watermarkUrl: this.editForm.get(['watermarkUrl'])!.value,
      priority: this.editForm.get(['priority'])!.value,
      defaultInd: this.editForm.get(['defaultInd'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhotos>>): void {
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
