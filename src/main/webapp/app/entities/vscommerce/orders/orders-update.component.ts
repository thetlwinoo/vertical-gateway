import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrders, Orders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from './orders.service';
import { IReviews } from 'app/shared/model/vscommerce/reviews.model';
import { ReviewsService } from 'app/entities/vscommerce/reviews/reviews.service';
import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { IAddresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from 'app/entities/vscommerce/addresses/addresses.service';
import { IShipMethod } from 'app/shared/model/vscommerce/ship-method.model';
import { ShipMethodService } from 'app/entities/vscommerce/ship-method/ship-method.service';
import { ICurrencyRate } from 'app/shared/model/vscommerce/currency-rate.model';
import { CurrencyRateService } from 'app/entities/vscommerce/currency-rate/currency-rate.service';
import { ISpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';
import { SpecialDealsService } from 'app/entities/vscommerce/special-deals/special-deals.service';

type SelectableEntity = IReviews | ICustomers | IAddresses | IShipMethod | ICurrencyRate | ISpecialDeals;

@Component({
  selector: 'jhi-orders-update',
  templateUrl: './orders-update.component.html',
})
export class OrdersUpdateComponent implements OnInit {
  isSaving = false;
  reviews: IReviews[] = [];
  customers: ICustomers[] = [];
  addresses: IAddresses[] = [];
  shipmethods: IShipMethod[] = [];
  currencyrates: ICurrencyRate[] = [];
  specialdeals: ISpecialDeals[] = [];

  editForm = this.fb.group({
    id: [],
    orderDate: [null, [Validators.required]],
    dueDate: [],
    expectedDeliveryDate: [],
    paymentStatus: [],
    accountNumber: [],
    subTotal: [],
    taxAmount: [],
    frieight: [],
    totalDue: [],
    comments: [],
    deliveryInstructions: [],
    internalComments: [],
    pickingCompletedWhen: [],
    status: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    reviewId: [],
    customerId: [],
    shipToAddressId: [],
    billToAddressId: [],
    shipMethodId: [],
    currencyRateId: [],
    specialDealsId: [],
  });

  constructor(
    protected ordersService: OrdersService,
    protected reviewsService: ReviewsService,
    protected customersService: CustomersService,
    protected addressesService: AddressesService,
    protected shipMethodService: ShipMethodService,
    protected currencyRateService: CurrencyRateService,
    protected specialDealsService: SpecialDealsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orders }) => {
      if (!orders.id) {
        const today = moment().startOf('day');
        orders.orderDate = today;
        orders.dueDate = today;
        orders.expectedDeliveryDate = today;
        orders.pickingCompletedWhen = today;
        orders.lastEditedWhen = today;
      }

      this.updateForm(orders);

      this.reviewsService
        .query({ 'orderId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IReviews[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IReviews[]) => {
          if (!orders.reviewId) {
            this.reviews = resBody;
          } else {
            this.reviewsService
              .find(orders.reviewId)
              .pipe(
                map((subRes: HttpResponse<IReviews>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IReviews[]) => (this.reviews = concatRes));
          }
        });

      this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));

      this.addressesService.query().subscribe((res: HttpResponse<IAddresses[]>) => (this.addresses = res.body || []));

      this.shipMethodService.query().subscribe((res: HttpResponse<IShipMethod[]>) => (this.shipmethods = res.body || []));

      this.currencyRateService.query().subscribe((res: HttpResponse<ICurrencyRate[]>) => (this.currencyrates = res.body || []));

      this.specialDealsService.query().subscribe((res: HttpResponse<ISpecialDeals[]>) => (this.specialdeals = res.body || []));
    });
  }

  updateForm(orders: IOrders): void {
    this.editForm.patchValue({
      id: orders.id,
      orderDate: orders.orderDate ? orders.orderDate.format(DATE_TIME_FORMAT) : null,
      dueDate: orders.dueDate ? orders.dueDate.format(DATE_TIME_FORMAT) : null,
      expectedDeliveryDate: orders.expectedDeliveryDate ? orders.expectedDeliveryDate.format(DATE_TIME_FORMAT) : null,
      paymentStatus: orders.paymentStatus,
      accountNumber: orders.accountNumber,
      subTotal: orders.subTotal,
      taxAmount: orders.taxAmount,
      frieight: orders.frieight,
      totalDue: orders.totalDue,
      comments: orders.comments,
      deliveryInstructions: orders.deliveryInstructions,
      internalComments: orders.internalComments,
      pickingCompletedWhen: orders.pickingCompletedWhen ? orders.pickingCompletedWhen.format(DATE_TIME_FORMAT) : null,
      status: orders.status,
      lastEditedBy: orders.lastEditedBy,
      lastEditedWhen: orders.lastEditedWhen ? orders.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      reviewId: orders.reviewId,
      customerId: orders.customerId,
      shipToAddressId: orders.shipToAddressId,
      billToAddressId: orders.billToAddressId,
      shipMethodId: orders.shipMethodId,
      currencyRateId: orders.currencyRateId,
      specialDealsId: orders.specialDealsId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orders = this.createFromForm();
    if (orders.id !== undefined) {
      this.subscribeToSaveResponse(this.ordersService.update(orders));
    } else {
      this.subscribeToSaveResponse(this.ordersService.create(orders));
    }
  }

  private createFromForm(): IOrders {
    return {
      ...new Orders(),
      id: this.editForm.get(['id'])!.value,
      orderDate: this.editForm.get(['orderDate'])!.value ? moment(this.editForm.get(['orderDate'])!.value, DATE_TIME_FORMAT) : undefined,
      dueDate: this.editForm.get(['dueDate'])!.value ? moment(this.editForm.get(['dueDate'])!.value, DATE_TIME_FORMAT) : undefined,
      expectedDeliveryDate: this.editForm.get(['expectedDeliveryDate'])!.value
        ? moment(this.editForm.get(['expectedDeliveryDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      paymentStatus: this.editForm.get(['paymentStatus'])!.value,
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      subTotal: this.editForm.get(['subTotal'])!.value,
      taxAmount: this.editForm.get(['taxAmount'])!.value,
      frieight: this.editForm.get(['frieight'])!.value,
      totalDue: this.editForm.get(['totalDue'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      deliveryInstructions: this.editForm.get(['deliveryInstructions'])!.value,
      internalComments: this.editForm.get(['internalComments'])!.value,
      pickingCompletedWhen: this.editForm.get(['pickingCompletedWhen'])!.value
        ? moment(this.editForm.get(['pickingCompletedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      status: this.editForm.get(['status'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      reviewId: this.editForm.get(['reviewId'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
      shipToAddressId: this.editForm.get(['shipToAddressId'])!.value,
      billToAddressId: this.editForm.get(['billToAddressId'])!.value,
      shipMethodId: this.editForm.get(['shipMethodId'])!.value,
      currencyRateId: this.editForm.get(['currencyRateId'])!.value,
      specialDealsId: this.editForm.get(['specialDealsId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrders>>): void {
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
