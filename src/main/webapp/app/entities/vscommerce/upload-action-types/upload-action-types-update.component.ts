import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUploadActionTypes, UploadActionTypes } from 'app/shared/model/vscommerce/upload-action-types.model';
import { UploadActionTypesService } from './upload-action-types.service';

@Component({
  selector: 'jhi-upload-action-types-update',
  templateUrl: './upload-action-types-update.component.html',
})
export class UploadActionTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(
    protected uploadActionTypesService: UploadActionTypesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uploadActionTypes }) => {
      this.updateForm(uploadActionTypes);
    });
  }

  updateForm(uploadActionTypes: IUploadActionTypes): void {
    this.editForm.patchValue({
      id: uploadActionTypes.id,
      name: uploadActionTypes.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const uploadActionTypes = this.createFromForm();
    if (uploadActionTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.uploadActionTypesService.update(uploadActionTypes));
    } else {
      this.subscribeToSaveResponse(this.uploadActionTypesService.create(uploadActionTypes));
    }
  }

  private createFromForm(): IUploadActionTypes {
    return {
      ...new UploadActionTypes(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUploadActionTypes>>): void {
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
