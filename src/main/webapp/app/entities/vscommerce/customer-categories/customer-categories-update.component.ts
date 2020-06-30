import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerCategories, CustomerCategories } from 'app/shared/model/vscommerce/customer-categories.model';
import { CustomerCategoriesService } from './customer-categories.service';

@Component({
  selector: 'jhi-customer-categories-update',
  templateUrl: './customer-categories-update.component.html',
})
export class CustomerCategoriesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
  });

  constructor(
    protected customerCategoriesService: CustomerCategoriesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerCategories }) => {
      if (!customerCategories.id) {
        const today = moment().startOf('day');
        customerCategories.validFrom = today;
        customerCategories.validTo = today;
      }

      this.updateForm(customerCategories);
    });
  }

  updateForm(customerCategories: ICustomerCategories): void {
    this.editForm.patchValue({
      id: customerCategories.id,
      name: customerCategories.name,
      validFrom: customerCategories.validFrom ? customerCategories.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: customerCategories.validTo ? customerCategories.validTo.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerCategories = this.createFromForm();
    if (customerCategories.id !== undefined) {
      this.subscribeToSaveResponse(this.customerCategoriesService.update(customerCategories));
    } else {
      this.subscribeToSaveResponse(this.customerCategoriesService.create(customerCategories));
    }
  }

  private createFromForm(): ICustomerCategories {
    return {
      ...new CustomerCategories(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerCategories>>): void {
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
