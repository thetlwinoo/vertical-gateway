import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import {
  ICustomerPaymentBankTransfer,
  CustomerPaymentBankTransfer,
} from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';
import { CustomerPaymentBankTransferService } from './customer-payment-bank-transfer.service';
import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from 'app/entities/vscommerce/customer-payment/customer-payment.service';
import { ICurrency } from 'app/shared/model/vscommerce/currency.model';
import { CurrencyService } from 'app/entities/vscommerce/currency/currency.service';

type SelectableEntity = ICustomerPayment | ICurrency;

@Component({
  selector: 'jhi-customer-payment-bank-transfer-update',
  templateUrl: './customer-payment-bank-transfer-update.component.html',
})
export class CustomerPaymentBankTransferUpdateComponent implements OnInit {
  isSaving = false;
  customerpayments: ICustomerPayment[] = [];
  currencies: ICurrency[] = [];

  editForm = this.fb.group({
    id: [],
    receiptImageUrl: [null, [Validators.required]],
    nameInBankAccount: [null, [Validators.required]],
    dateOfTransfer: [null, [Validators.required]],
    amountTransferred: [null, [Validators.required]],
    lastEdityBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    customerPaymentId: [],
    currencyId: [],
  });

  constructor(
    protected customerPaymentBankTransferService: CustomerPaymentBankTransferService,
    protected customerPaymentService: CustomerPaymentService,
    protected currencyService: CurrencyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentBankTransfer }) => {
      if (!customerPaymentBankTransfer.id) {
        const today = moment().startOf('day');
        customerPaymentBankTransfer.dateOfTransfer = today;
        customerPaymentBankTransfer.lastEditedWhen = today;
      }

      this.updateForm(customerPaymentBankTransfer);

      this.customerPaymentService
        .query({ 'customerPaymentBankTransferId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ICustomerPayment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustomerPayment[]) => {
          if (!customerPaymentBankTransfer.customerPaymentId) {
            this.customerpayments = resBody;
          } else {
            this.customerPaymentService
              .find(customerPaymentBankTransfer.customerPaymentId)
              .pipe(
                map((subRes: HttpResponse<ICustomerPayment>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICustomerPayment[]) => (this.customerpayments = concatRes));
          }
        });

      this.currencyService.query().subscribe((res: HttpResponse<ICurrency[]>) => (this.currencies = res.body || []));
    });
  }

  updateForm(customerPaymentBankTransfer: ICustomerPaymentBankTransfer): void {
    this.editForm.patchValue({
      id: customerPaymentBankTransfer.id,
      receiptImageUrl: customerPaymentBankTransfer.receiptImageUrl,
      nameInBankAccount: customerPaymentBankTransfer.nameInBankAccount,
      dateOfTransfer: customerPaymentBankTransfer.dateOfTransfer
        ? customerPaymentBankTransfer.dateOfTransfer.format(DATE_TIME_FORMAT)
        : null,
      amountTransferred: customerPaymentBankTransfer.amountTransferred,
      lastEdityBy: customerPaymentBankTransfer.lastEdityBy,
      lastEditedWhen: customerPaymentBankTransfer.lastEditedWhen
        ? customerPaymentBankTransfer.lastEditedWhen.format(DATE_TIME_FORMAT)
        : null,
      customerPaymentId: customerPaymentBankTransfer.customerPaymentId,
      currencyId: customerPaymentBankTransfer.currencyId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerPaymentBankTransfer = this.createFromForm();
    if (customerPaymentBankTransfer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerPaymentBankTransferService.update(customerPaymentBankTransfer));
    } else {
      this.subscribeToSaveResponse(this.customerPaymentBankTransferService.create(customerPaymentBankTransfer));
    }
  }

  private createFromForm(): ICustomerPaymentBankTransfer {
    return {
      ...new CustomerPaymentBankTransfer(),
      id: this.editForm.get(['id'])!.value,
      receiptImageUrl: this.editForm.get(['receiptImageUrl'])!.value,
      nameInBankAccount: this.editForm.get(['nameInBankAccount'])!.value,
      dateOfTransfer: this.editForm.get(['dateOfTransfer'])!.value
        ? moment(this.editForm.get(['dateOfTransfer'])!.value, DATE_TIME_FORMAT)
        : undefined,
      amountTransferred: this.editForm.get(['amountTransferred'])!.value,
      lastEdityBy: this.editForm.get(['lastEdityBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerPaymentId: this.editForm.get(['customerPaymentId'])!.value,
      currencyId: this.editForm.get(['currencyId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerPaymentBankTransfer>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
