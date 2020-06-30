import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWarrantyTypes, WarrantyTypes } from 'app/shared/model/vscommerce/warranty-types.model';
import { WarrantyTypesService } from './warranty-types.service';

@Component({
  selector: 'jhi-warranty-types-update',
  templateUrl: './warranty-types-update.component.html',
})
export class WarrantyTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected warrantyTypesService: WarrantyTypesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ warrantyTypes }) => {
      this.updateForm(warrantyTypes);
    });
  }

  updateForm(warrantyTypes: IWarrantyTypes): void {
    this.editForm.patchValue({
      id: warrantyTypes.id,
      name: warrantyTypes.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const warrantyTypes = this.createFromForm();
    if (warrantyTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.warrantyTypesService.update(warrantyTypes));
    } else {
      this.subscribeToSaveResponse(this.warrantyTypesService.create(warrantyTypes));
    }
  }

  private createFromForm(): IWarrantyTypes {
    return {
      ...new WarrantyTypes(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWarrantyTypes>>): void {
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
