import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBarcodeTypes, BarcodeTypes } from 'app/shared/model/vscommerce/barcode-types.model';
import { BarcodeTypesService } from './barcode-types.service';

@Component({
  selector: 'jhi-barcode-types-update',
  templateUrl: './barcode-types-update.component.html',
})
export class BarcodeTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected barcodeTypesService: BarcodeTypesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ barcodeTypes }) => {
      this.updateForm(barcodeTypes);
    });
  }

  updateForm(barcodeTypes: IBarcodeTypes): void {
    this.editForm.patchValue({
      id: barcodeTypes.id,
      name: barcodeTypes.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const barcodeTypes = this.createFromForm();
    if (barcodeTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.barcodeTypesService.update(barcodeTypes));
    } else {
      this.subscribeToSaveResponse(this.barcodeTypesService.create(barcodeTypes));
    }
  }

  private createFromForm(): IBarcodeTypes {
    return {
      ...new BarcodeTypes(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBarcodeTypes>>): void {
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
