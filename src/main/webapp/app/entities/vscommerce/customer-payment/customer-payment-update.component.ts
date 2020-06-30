import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerPayment, CustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from './customer-payment.service';
import { ICustomerTransactions } from 'app/shared/model/vscommerce/customer-transactions.model';
import { CustomerTransactionsService } from 'app/entities/vscommerce/customer-transactions/customer-transactions.service';
import { IPaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from 'app/entities/vscommerce/payment-methods/payment-methods.service';
import { ICurrency } from 'app/shared/model/vscommerce/currency.model';
import { CurrencyService } from 'app/entities/vscommerce/currency/currency.service';
import { ICurrencyRate } from 'app/shared/model/vscommerce/currency-rate.model';
import { CurrencyRateService } from 'app/entities/vscommerce/currency-rate/currency-rate.service';

type SelectableEntity = ICustomerTransactions | IPaymentMethods | ICurrency | ICurrencyRate;

@Component({
  selector: 'jhi-customer-payment-update',
  templateUrl: './customer-payment-update.component.html',
})
export class CustomerPaymentUpdateComponent implements OnInit {
  isSaving = false;
  customertransactions: ICustomerTransactions[] = [];
  paymentmethods: IPaymentMethods[] = [];
  currencies: ICurrency[] = [];
  currencyrates: ICurrencyRate[] = [];

  editForm = this.fb.group({
    id: [],
    amountExcludingTax: [null, [Validators.required]],
    taxAmount: [null, [Validators.required]],
    transactionAmount: [null, [Validators.required]],
    outstandingAmount: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    customerTransactionId: [],
    paymentMethodId: [],
    currencyId: [],
    currencyRateId: [],
  });

  constructor(
    protected customerPaymentService: CustomerPaymentService,
    protected customerTransactionsService: CustomerTransactionsService,
    protected paymentMethodsService: PaymentMethodsService,
    protected currencyService: CurrencyService,
    protected currencyRateService: CurrencyRateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPayment }) => {
      if (!customerPayment.id) {
        const today = moment().startOf('day');
        customerPayment.lastEditedWhen = today;
      }

      this.updateForm(customerPayment);

      this.customerTransactionsService
        .query({ 'customerPaymentId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ICustomerTransactions[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustomerTransactions[]) => {
          if (!customerPayment.customerTransactionId) {
            this.customertransactions = resBody;
          } else {
            this.customerTransactionsService
              .find(customerPayment.customerTransactionId)
              .pipe(
                map((subRes: HttpResponse<ICustomerTransactions>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICustomerTransactions[]) => (this.customertransactions = concatRes));
          }
        });

      this.paymentMethodsService.query().subscribe((res: HttpResponse<IPaymentMethods[]>) => (this.paymentmethods = res.body || []));

      this.currencyService.query().subscribe((res: HttpResponse<ICurrency[]>) => (this.currencies = res.body || []));

      this.currencyRateService.query().subscribe((res: HttpResponse<ICurrencyRate[]>) => (this.currencyrates = res.body || []));
    });
  }

  updateForm(customerPayment: ICustomerPayment): void {
    this.editForm.patchValue({
      id: customerPayment.id,
      amountExcludingTax: customerPayment.amountExcludingTax,
      taxAmount: customerPayment.taxAmount,
      transactionAmount: customerPayment.transactionAmount,
      outstandingAmount: customerPayment.outstandingAmount,
      lastEditedBy: customerPayment.lastEditedBy,
      lastEditedWhen: customerPayment.lastEditedWhen ? customerPayment.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      customerTransactionId: customerPayment.customerTransactionId,
      paymentMethodId: customerPayment.paymentMethodId,
      currencyId: customerPayment.currencyId,
      currencyRateId: customerPayment.currencyRateId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerPayment = this.createFromForm();
    if (customerPayment.id !== undefined) {
      this.subscribeToSaveResponse(this.customerPaymentService.update(customerPayment));
    } else {
      this.subscribeToSaveResponse(this.customerPaymentService.create(customerPayment));
    }
  }

  private createFromForm(): ICustomerPayment {
    return {
      ...new CustomerPayment(),
      id: this.editForm.get(['id'])!.value,
      amountExcludingTax: this.editForm.get(['amountExcludingTax'])!.value,
      taxAmount: this.editForm.get(['taxAmount'])!.value,
      transactionAmount: this.editForm.get(['transactionAmount'])!.value,
      outstandingAmount: this.editForm.get(['outstandingAmount'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerTransactionId: this.editForm.get(['customerTransactionId'])!.value,
      paymentMethodId: this.editForm.get(['paymentMethodId'])!.value,
      currencyId: this.editForm.get(['currencyId'])!.value,
      currencyRateId: this.editForm.get(['currencyRateId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerPayment>>): void {
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
