import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerPaymentVoucher, CustomerPaymentVoucher } from 'app/shared/model/vscommerce/customer-payment-voucher.model';
import { CustomerPaymentVoucherService } from './customer-payment-voucher.service';
import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from 'app/entities/vscommerce/customer-payment/customer-payment.service';
import { ICurrency } from 'app/shared/model/vscommerce/currency.model';
import { CurrencyService } from 'app/entities/vscommerce/currency/currency.service';

type SelectableEntity = ICustomerPayment | ICurrency;

@Component({
  selector: 'jhi-customer-payment-voucher-update',
  templateUrl: './customer-payment-voucher-update.component.html',
})
export class CustomerPaymentVoucherUpdateComponent implements OnInit {
  isSaving = false;
  customerpayments: ICustomerPayment[] = [];
  currencies: ICurrency[] = [];

  editForm = this.fb.group({
    id: [],
    serialNo: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    lastEdityBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    customerPaymentId: [],
    currencyId: [],
  });

  constructor(
    protected customerPaymentVoucherService: CustomerPaymentVoucherService,
    protected customerPaymentService: CustomerPaymentService,
    protected currencyService: CurrencyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentVoucher }) => {
      if (!customerPaymentVoucher.id) {
        const today = moment().startOf('day');
        customerPaymentVoucher.lastEditedWhen = today;
      }

      this.updateForm(customerPaymentVoucher);

      this.customerPaymentService
        .query({ 'customerPaymentVoucherId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ICustomerPayment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustomerPayment[]) => {
          if (!customerPaymentVoucher.customerPaymentId) {
            this.customerpayments = resBody;
          } else {
            this.customerPaymentService
              .find(customerPaymentVoucher.customerPaymentId)
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

  updateForm(customerPaymentVoucher: ICustomerPaymentVoucher): void {
    this.editForm.patchValue({
      id: customerPaymentVoucher.id,
      serialNo: customerPaymentVoucher.serialNo,
      amount: customerPaymentVoucher.amount,
      lastEdityBy: customerPaymentVoucher.lastEdityBy,
      lastEditedWhen: customerPaymentVoucher.lastEditedWhen ? customerPaymentVoucher.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      customerPaymentId: customerPaymentVoucher.customerPaymentId,
      currencyId: customerPaymentVoucher.currencyId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerPaymentVoucher = this.createFromForm();
    if (customerPaymentVoucher.id !== undefined) {
      this.subscribeToSaveResponse(this.customerPaymentVoucherService.update(customerPaymentVoucher));
    } else {
      this.subscribeToSaveResponse(this.customerPaymentVoucherService.create(customerPaymentVoucher));
    }
  }

  private createFromForm(): ICustomerPaymentVoucher {
    return {
      ...new CustomerPaymentVoucher(),
      id: this.editForm.get(['id'])!.value,
      serialNo: this.editForm.get(['serialNo'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      lastEdityBy: this.editForm.get(['lastEdityBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerPaymentId: this.editForm.get(['customerPaymentId'])!.value,
      currencyId: this.editForm.get(['currencyId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerPaymentVoucher>>): void {
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
