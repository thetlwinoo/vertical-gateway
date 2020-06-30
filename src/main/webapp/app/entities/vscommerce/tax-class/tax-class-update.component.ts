import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITaxClass, TaxClass } from 'app/shared/model/vscommerce/tax-class.model';
import { TaxClassService } from './tax-class.service';

@Component({
  selector: 'jhi-tax-class-update',
  templateUrl: './tax-class-update.component.html',
})
export class TaxClassUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
  });

  constructor(protected taxClassService: TaxClassService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taxClass }) => {
      this.updateForm(taxClass);
    });
  }

  updateForm(taxClass: ITaxClass): void {
    this.editForm.patchValue({
      id: taxClass.id,
      code: taxClass.code,
      name: taxClass.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taxClass = this.createFromForm();
    if (taxClass.id !== undefined) {
      this.subscribeToSaveResponse(this.taxClassService.update(taxClass));
    } else {
      this.subscribeToSaveResponse(this.taxClassService.create(taxClass));
    }
  }

  private createFromForm(): ITaxClass {
    return {
      ...new TaxClass(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaxClass>>): void {
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
