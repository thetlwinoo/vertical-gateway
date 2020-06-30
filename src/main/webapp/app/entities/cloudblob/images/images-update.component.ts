import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IImages, Images } from 'app/shared/model/cloudblob/images.model';
import { ImagesService } from './images.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-images-update',
  templateUrl: './images-update.component.html',
})
export class ImagesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    thumbnail: [null, [Validators.required]],
    thumbnailContentType: [],
    original: [null, [Validators.required]],
    originalContentType: [],
    bannerTall: [],
    bannerTallContentType: [],
    bannerWide: [],
    bannerWideContentType: [],
    circle: [],
    circleContentType: [],
    sharpened: [],
    sharpenedContentType: [],
    square: [],
    squareContentType: [],
    watermark: [],
    watermarkContentType: [],
    refId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected imagesService: ImagesService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ images }) => {
      this.updateForm(images);
    });
  }

  updateForm(images: IImages): void {
    this.editForm.patchValue({
      id: images.id,
      thumbnail: images.thumbnail,
      thumbnailContentType: images.thumbnailContentType,
      original: images.original,
      originalContentType: images.originalContentType,
      bannerTall: images.bannerTall,
      bannerTallContentType: images.bannerTallContentType,
      bannerWide: images.bannerWide,
      bannerWideContentType: images.bannerWideContentType,
      circle: images.circle,
      circleContentType: images.circleContentType,
      sharpened: images.sharpened,
      sharpenedContentType: images.sharpenedContentType,
      square: images.square,
      squareContentType: images.squareContentType,
      watermark: images.watermark,
      watermarkContentType: images.watermarkContentType,
      refId: images.refId,
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const images = this.createFromForm();
    if (images.id !== undefined) {
      this.subscribeToSaveResponse(this.imagesService.update(images));
    } else {
      this.subscribeToSaveResponse(this.imagesService.create(images));
    }
  }

  private createFromForm(): IImages {
    return {
      ...new Images(),
      id: this.editForm.get(['id'])!.value,
      thumbnailContentType: this.editForm.get(['thumbnailContentType'])!.value,
      thumbnail: this.editForm.get(['thumbnail'])!.value,
      originalContentType: this.editForm.get(['originalContentType'])!.value,
      original: this.editForm.get(['original'])!.value,
      bannerTallContentType: this.editForm.get(['bannerTallContentType'])!.value,
      bannerTall: this.editForm.get(['bannerTall'])!.value,
      bannerWideContentType: this.editForm.get(['bannerWideContentType'])!.value,
      bannerWide: this.editForm.get(['bannerWide'])!.value,
      circleContentType: this.editForm.get(['circleContentType'])!.value,
      circle: this.editForm.get(['circle'])!.value,
      sharpenedContentType: this.editForm.get(['sharpenedContentType'])!.value,
      sharpened: this.editForm.get(['sharpened'])!.value,
      squareContentType: this.editForm.get(['squareContentType'])!.value,
      square: this.editForm.get(['square'])!.value,
      watermarkContentType: this.editForm.get(['watermarkContentType'])!.value,
      watermark: this.editForm.get(['watermark'])!.value,
      refId: this.editForm.get(['refId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImages>>): void {
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
