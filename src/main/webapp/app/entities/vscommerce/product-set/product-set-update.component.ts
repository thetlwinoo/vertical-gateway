import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProductSet, ProductSet } from 'app/shared/model/vscommerce/product-set.model';
import { ProductSetService } from './product-set.service';

@Component({
  selector: 'jhi-product-set-update',
  templateUrl: './product-set-update.component.html',
})
export class ProductSetUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    noOfPerson: [null, [Validators.required]],
    isExclusive: [null, [Validators.required]],
    modifinedDate: [null, [Validators.required]],
  });

  constructor(protected productSetService: ProductSetService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productSet }) => {
      if (!productSet.id) {
        const today = moment().startOf('day');
        productSet.modifinedDate = today;
      }

      this.updateForm(productSet);
    });
  }

  updateForm(productSet: IProductSet): void {
    this.editForm.patchValue({
      id: productSet.id,
      name: productSet.name,
      noOfPerson: productSet.noOfPerson,
      isExclusive: productSet.isExclusive,
      modifinedDate: productSet.modifinedDate ? productSet.modifinedDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productSet = this.createFromForm();
    if (productSet.id !== undefined) {
      this.subscribeToSaveResponse(this.productSetService.update(productSet));
    } else {
      this.subscribeToSaveResponse(this.productSetService.create(productSet));
    }
  }

  private createFromForm(): IProductSet {
    return {
      ...new ProductSet(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      noOfPerson: this.editForm.get(['noOfPerson'])!.value,
      isExclusive: this.editForm.get(['isExclusive'])!.value,
      modifinedDate: this.editForm.get(['modifinedDate'])!.value
        ? moment(this.editForm.get(['modifinedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductSet>>): void {
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
