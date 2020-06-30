import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ICustomerPaymentPaypal, CustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';
import { CustomerPaymentPaypalService } from './customer-payment-paypal.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from 'app/entities/vscommerce/customer-payment/customer-payment.service';
import { ICurrency } from 'app/shared/model/vscommerce/currency.model';
import { CurrencyService } from 'app/entities/vscommerce/currency/currency.service';

type SelectableEntity = ICustomerPayment | ICurrency;

@Component({
  selector: 'jhi-customer-payment-paypal-update',
  templateUrl: './customer-payment-paypal-update.component.html',
})
export class CustomerPaymentPaypalUpdateComponent implements OnInit {
  isSaving = false;
  customerpayments: ICustomerPayment[] = [];
  currencies: ICurrency[] = [];

  editForm = this.fb.group({
    id: [],
    paypalAccount: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    responseCode: [null, [Validators.required]],
    approvalCode: [null, [Validators.required]],
    responseData: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    customerPaymentId: [],
    currencyId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected customerPaymentPaypalService: CustomerPaymentPaypalService,
    protected customerPaymentService: CustomerPaymentService,
    protected currencyService: CurrencyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentPaypal }) => {
      if (!customerPaymentPaypal.id) {
        const today = moment().startOf('day');
        customerPaymentPaypal.lastEditedWhen = today;
      }

      this.updateForm(customerPaymentPaypal);

      this.customerPaymentService
        .query({ 'customerPaymentPaypalId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ICustomerPayment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustomerPayment[]) => {
          if (!customerPaymentPaypal.customerPaymentId) {
            this.customerpayments = resBody;
          } else {
            this.customerPaymentService
              .find(customerPaymentPaypal.customerPaymentId)
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

  updateForm(customerPaymentPaypal: ICustomerPaymentPaypal): void {
    this.editForm.patchValue({
      id: customerPaymentPaypal.id,
      paypalAccount: customerPaymentPaypal.paypalAccount,
      amount: customerPaymentPaypal.amount,
      responseCode: customerPaymentPaypal.responseCode,
      approvalCode: customerPaymentPaypal.approvalCode,
      responseData: customerPaymentPaypal.responseData,
      lastEditedBy: customerPaymentPaypal.lastEditedBy,
      lastEditedWhen: customerPaymentPaypal.lastEditedWhen ? customerPaymentPaypal.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      customerPaymentId: customerPaymentPaypal.customerPaymentId,
      currencyId: customerPaymentPaypal.currencyId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerPaymentPaypal = this.createFromForm();
    if (customerPaymentPaypal.id !== undefined) {
      this.subscribeToSaveResponse(this.customerPaymentPaypalService.update(customerPaymentPaypal));
    } else {
      this.subscribeToSaveResponse(this.customerPaymentPaypalService.create(customerPaymentPaypal));
    }
  }

  private createFromForm(): ICustomerPaymentPaypal {
    return {
      ...new CustomerPaymentPaypal(),
      id: this.editForm.get(['id'])!.value,
      paypalAccount: this.editForm.get(['paypalAccount'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      responseCode: this.editForm.get(['responseCode'])!.value,
      approvalCode: this.editForm.get(['approvalCode'])!.value,
      responseData: this.editForm.get(['responseData'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerPaymentId: this.editForm.get(['customerPaymentId'])!.value,
      currencyId: this.editForm.get(['currencyId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerPaymentPaypal>>): void {
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
