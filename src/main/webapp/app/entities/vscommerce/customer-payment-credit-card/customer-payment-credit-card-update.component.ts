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

import { ICustomerPaymentCreditCard, CustomerPaymentCreditCard } from 'app/shared/model/vscommerce/customer-payment-credit-card.model';
import { CustomerPaymentCreditCardService } from './customer-payment-credit-card.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from 'app/entities/vscommerce/customer-payment/customer-payment.service';
import { ICurrency } from 'app/shared/model/vscommerce/currency.model';
import { CurrencyService } from 'app/entities/vscommerce/currency/currency.service';

type SelectableEntity = ICustomerPayment | ICurrency;

@Component({
  selector: 'jhi-customer-payment-credit-card-update',
  templateUrl: './customer-payment-credit-card-update.component.html',
})
export class CustomerPaymentCreditCardUpdateComponent implements OnInit {
  isSaving = false;
  customerpayments: ICustomerPayment[] = [];
  currencies: ICurrency[] = [];

  editForm = this.fb.group({
    id: [],
    creditCardNumber: [null, [Validators.required]],
    creditCardExpiryMonth: [null, [Validators.required]],
    creditCardExpiryYear: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    batchId: [null, [Validators.required]],
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
    protected customerPaymentCreditCardService: CustomerPaymentCreditCardService,
    protected customerPaymentService: CustomerPaymentService,
    protected currencyService: CurrencyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentCreditCard }) => {
      if (!customerPaymentCreditCard.id) {
        const today = moment().startOf('day');
        customerPaymentCreditCard.lastEditedWhen = today;
      }

      this.updateForm(customerPaymentCreditCard);

      this.customerPaymentService
        .query({ 'customerPaymentCreditCardId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ICustomerPayment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustomerPayment[]) => {
          if (!customerPaymentCreditCard.customerPaymentId) {
            this.customerpayments = resBody;
          } else {
            this.customerPaymentService
              .find(customerPaymentCreditCard.customerPaymentId)
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

  updateForm(customerPaymentCreditCard: ICustomerPaymentCreditCard): void {
    this.editForm.patchValue({
      id: customerPaymentCreditCard.id,
      creditCardNumber: customerPaymentCreditCard.creditCardNumber,
      creditCardExpiryMonth: customerPaymentCreditCard.creditCardExpiryMonth,
      creditCardExpiryYear: customerPaymentCreditCard.creditCardExpiryYear,
      amount: customerPaymentCreditCard.amount,
      batchId: customerPaymentCreditCard.batchId,
      responseCode: customerPaymentCreditCard.responseCode,
      approvalCode: customerPaymentCreditCard.approvalCode,
      responseData: customerPaymentCreditCard.responseData,
      lastEditedBy: customerPaymentCreditCard.lastEditedBy,
      lastEditedWhen: customerPaymentCreditCard.lastEditedWhen ? customerPaymentCreditCard.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      customerPaymentId: customerPaymentCreditCard.customerPaymentId,
      currencyId: customerPaymentCreditCard.currencyId,
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
    const customerPaymentCreditCard = this.createFromForm();
    if (customerPaymentCreditCard.id !== undefined) {
      this.subscribeToSaveResponse(this.customerPaymentCreditCardService.update(customerPaymentCreditCard));
    } else {
      this.subscribeToSaveResponse(this.customerPaymentCreditCardService.create(customerPaymentCreditCard));
    }
  }

  private createFromForm(): ICustomerPaymentCreditCard {
    return {
      ...new CustomerPaymentCreditCard(),
      id: this.editForm.get(['id'])!.value,
      creditCardNumber: this.editForm.get(['creditCardNumber'])!.value,
      creditCardExpiryMonth: this.editForm.get(['creditCardExpiryMonth'])!.value,
      creditCardExpiryYear: this.editForm.get(['creditCardExpiryYear'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      batchId: this.editForm.get(['batchId'])!.value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerPaymentCreditCard>>): void {
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
