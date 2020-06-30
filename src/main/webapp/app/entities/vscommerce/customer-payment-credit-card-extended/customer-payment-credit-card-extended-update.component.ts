import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import {
  ICustomerPaymentCreditCardExtended,
  CustomerPaymentCreditCardExtended,
} from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';
import { CustomerPaymentCreditCardExtendedService } from './customer-payment-credit-card-extended.service';

@Component({
  selector: 'jhi-customer-payment-credit-card-extended-update',
  templateUrl: './customer-payment-credit-card-extended-update.component.html',
})
export class CustomerPaymentCreditCardExtendedUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    errorCode: [null, [Validators.required]],
    errorMessage: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditeWhen: [null, [Validators.required]],
  });

  constructor(
    protected customerPaymentCreditCardExtendedService: CustomerPaymentCreditCardExtendedService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentCreditCardExtended }) => {
      if (!customerPaymentCreditCardExtended.id) {
        const today = moment().startOf('day');
        customerPaymentCreditCardExtended.lastEditeWhen = today;
      }

      this.updateForm(customerPaymentCreditCardExtended);
    });
  }

  updateForm(customerPaymentCreditCardExtended: ICustomerPaymentCreditCardExtended): void {
    this.editForm.patchValue({
      id: customerPaymentCreditCardExtended.id,
      errorCode: customerPaymentCreditCardExtended.errorCode,
      errorMessage: customerPaymentCreditCardExtended.errorMessage,
      lastEditedBy: customerPaymentCreditCardExtended.lastEditedBy,
      lastEditeWhen: customerPaymentCreditCardExtended.lastEditeWhen
        ? customerPaymentCreditCardExtended.lastEditeWhen.format(DATE_TIME_FORMAT)
        : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerPaymentCreditCardExtended = this.createFromForm();
    if (customerPaymentCreditCardExtended.id !== undefined) {
      this.subscribeToSaveResponse(this.customerPaymentCreditCardExtendedService.update(customerPaymentCreditCardExtended));
    } else {
      this.subscribeToSaveResponse(this.customerPaymentCreditCardExtendedService.create(customerPaymentCreditCardExtended));
    }
  }

  private createFromForm(): ICustomerPaymentCreditCardExtended {
    return {
      ...new CustomerPaymentCreditCardExtended(),
      id: this.editForm.get(['id'])!.value,
      errorCode: this.editForm.get(['errorCode'])!.value,
      errorMessage: this.editForm.get(['errorMessage'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditeWhen: this.editForm.get(['lastEditeWhen'])!.value
        ? moment(this.editForm.get(['lastEditeWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerPaymentCreditCardExtended>>): void {
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
