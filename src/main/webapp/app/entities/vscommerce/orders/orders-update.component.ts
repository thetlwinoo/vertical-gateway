import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IOrders, Orders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from './orders.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { IAddresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from 'app/entities/vscommerce/addresses/addresses.service';
import { ICurrencyRate } from 'app/shared/model/vscommerce/currency-rate.model';
import { CurrencyRateService } from 'app/entities/vscommerce/currency-rate/currency-rate.service';
import { IPaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from 'app/entities/vscommerce/payment-methods/payment-methods.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { ISpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';
import { SpecialDealsService } from 'app/entities/vscommerce/special-deals/special-deals.service';

type SelectableEntity = ICustomers | IAddresses | ICurrencyRate | IPaymentMethods | IPeople | ISpecialDeals;

@Component({
  selector: 'jhi-orders-update',
  templateUrl: './orders-update.component.html',
})
export class OrdersUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomers[] = [];
  addresses: IAddresses[] = [];
  currencyrates: ICurrencyRate[] = [];
  paymentmethods: IPaymentMethods[] = [];
  people: IPeople[] = [];
  specialdeals: ISpecialDeals[] = [];

  editForm = this.fb.group({
    id: [],
    orderDate: [null, [Validators.required]],
    subTotal: [],
    totalTaxAmount: [],
    totalShippingFee: [],
    totalShippingFeeDiscount: [],
    totalVoucherDiscount: [],
    totalPromtionDiscount: [],
    totalDue: [],
    paymentStatus: [],
    customerPurchaseOrderNumber: [],
    status: [null, [Validators.required]],
    orderDetails: [],
    isUnderSupplyBackOrdered: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    customerId: [],
    shipToAddressId: [],
    billToAddressId: [],
    currencyRateId: [],
    paymentMethodId: [],
    salePersonId: [],
    specialDealsId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected ordersService: OrdersService,
    protected customersService: CustomersService,
    protected addressesService: AddressesService,
    protected currencyRateService: CurrencyRateService,
    protected paymentMethodsService: PaymentMethodsService,
    protected peopleService: PeopleService,
    protected specialDealsService: SpecialDealsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orders }) => {
      if (!orders.id) {
        const today = moment().startOf('day');
        orders.orderDate = today;
        orders.lastEditedWhen = today;
      }

      this.updateForm(orders);

      this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));

      this.addressesService.query().subscribe((res: HttpResponse<IAddresses[]>) => (this.addresses = res.body || []));

      this.currencyRateService.query().subscribe((res: HttpResponse<ICurrencyRate[]>) => (this.currencyrates = res.body || []));

      this.paymentMethodsService.query().subscribe((res: HttpResponse<IPaymentMethods[]>) => (this.paymentmethods = res.body || []));

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));

      this.specialDealsService.query().subscribe((res: HttpResponse<ISpecialDeals[]>) => (this.specialdeals = res.body || []));
    });
  }

  updateForm(orders: IOrders): void {
    this.editForm.patchValue({
      id: orders.id,
      orderDate: orders.orderDate ? orders.orderDate.format(DATE_TIME_FORMAT) : null,
      subTotal: orders.subTotal,
      totalTaxAmount: orders.totalTaxAmount,
      totalShippingFee: orders.totalShippingFee,
      totalShippingFeeDiscount: orders.totalShippingFeeDiscount,
      totalVoucherDiscount: orders.totalVoucherDiscount,
      totalPromtionDiscount: orders.totalPromtionDiscount,
      totalDue: orders.totalDue,
      paymentStatus: orders.paymentStatus,
      customerPurchaseOrderNumber: orders.customerPurchaseOrderNumber,
      status: orders.status,
      orderDetails: orders.orderDetails,
      isUnderSupplyBackOrdered: orders.isUnderSupplyBackOrdered,
      lastEditedBy: orders.lastEditedBy,
      lastEditedWhen: orders.lastEditedWhen ? orders.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      customerId: orders.customerId,
      shipToAddressId: orders.shipToAddressId,
      billToAddressId: orders.billToAddressId,
      currencyRateId: orders.currencyRateId,
      paymentMethodId: orders.paymentMethodId,
      salePersonId: orders.salePersonId,
      specialDealsId: orders.specialDealsId,
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
      subTotal: this.editForm.get(['subTotal'])!.value,
      totalTaxAmount: this.editForm.get(['totalTaxAmount'])!.value,
      totalShippingFee: this.editForm.get(['totalShippingFee'])!.value,
      totalShippingFeeDiscount: this.editForm.get(['totalShippingFeeDiscount'])!.value,
      totalVoucherDiscount: this.editForm.get(['totalVoucherDiscount'])!.value,
      totalPromtionDiscount: this.editForm.get(['totalPromtionDiscount'])!.value,
      totalDue: this.editForm.get(['totalDue'])!.value,
      paymentStatus: this.editForm.get(['paymentStatus'])!.value,
      customerPurchaseOrderNumber: this.editForm.get(['customerPurchaseOrderNumber'])!.value,
      status: this.editForm.get(['status'])!.value,
      orderDetails: this.editForm.get(['orderDetails'])!.value,
      isUnderSupplyBackOrdered: this.editForm.get(['isUnderSupplyBackOrdered'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerId: this.editForm.get(['customerId'])!.value,
      shipToAddressId: this.editForm.get(['shipToAddressId'])!.value,
      billToAddressId: this.editForm.get(['billToAddressId'])!.value,
      currencyRateId: this.editForm.get(['currencyRateId'])!.value,
      paymentMethodId: this.editForm.get(['paymentMethodId'])!.value,
      salePersonId: this.editForm.get(['salePersonId'])!.value,
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
