import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IInvoices, Invoices } from 'app/shared/model/vscommerce/invoices.model';
import { InvoicesService } from './invoices.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from 'app/entities/vscommerce/delivery-methods/delivery-methods.service';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from 'app/entities/vscommerce/orders/orders.service';
import { IOrderPackages } from 'app/shared/model/vscommerce/order-packages.model';
import { OrderPackagesService } from 'app/entities/vscommerce/order-packages/order-packages.service';
import { IPaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from 'app/entities/vscommerce/payment-methods/payment-methods.service';

type SelectableEntity = IPeople | ICustomers | IDeliveryMethods | IOrders | IOrderPackages | IPaymentMethods;

@Component({
  selector: 'jhi-invoices-update',
  templateUrl: './invoices-update.component.html',
})
export class InvoicesUpdateComponent implements OnInit {
  isSaving = false;
  people: IPeople[] = [];
  customers: ICustomers[] = [];
  deliverymethods: IDeliveryMethods[] = [];
  orders: IOrders[] = [];
  orderpackages: IOrderPackages[] = [];
  paymentmethods: IPaymentMethods[] = [];

  editForm = this.fb.group({
    id: [],
    invoiceDate: [null, [Validators.required]],
    customerPurchaseOrderNumber: [],
    isCreditNote: [null, [Validators.required]],
    creditNoteReason: [],
    comments: [],
    deliveryInstructions: [],
    internalComments: [],
    totalDryItems: [null, [Validators.required]],
    totalChillerItems: [null, [Validators.required]],
    deliveryRun: [],
    runPosition: [],
    returnedDeliveryData: [],
    confirmedDeliveryTime: [],
    confirmedReceivedBy: [],
    status: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    contactPersonId: [],
    salesPersonId: [],
    packedByPersonId: [],
    accountsPersonId: [],
    customerId: [],
    billToCustomerId: [],
    deliveryMethodId: [],
    orderId: [],
    orderPackageId: [],
    paymentMethodId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected invoicesService: InvoicesService,
    protected peopleService: PeopleService,
    protected customersService: CustomersService,
    protected deliveryMethodsService: DeliveryMethodsService,
    protected ordersService: OrdersService,
    protected orderPackagesService: OrderPackagesService,
    protected paymentMethodsService: PaymentMethodsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoices }) => {
      if (!invoices.id) {
        const today = moment().startOf('day');
        invoices.invoiceDate = today;
        invoices.confirmedDeliveryTime = today;
        invoices.lastEditedWhen = today;
      }

      this.updateForm(invoices);

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));

      this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));

      this.deliveryMethodsService.query().subscribe((res: HttpResponse<IDeliveryMethods[]>) => (this.deliverymethods = res.body || []));

      this.ordersService.query().subscribe((res: HttpResponse<IOrders[]>) => (this.orders = res.body || []));

      this.orderPackagesService.query().subscribe((res: HttpResponse<IOrderPackages[]>) => (this.orderpackages = res.body || []));

      this.paymentMethodsService.query().subscribe((res: HttpResponse<IPaymentMethods[]>) => (this.paymentmethods = res.body || []));
    });
  }

  updateForm(invoices: IInvoices): void {
    this.editForm.patchValue({
      id: invoices.id,
      invoiceDate: invoices.invoiceDate ? invoices.invoiceDate.format(DATE_TIME_FORMAT) : null,
      customerPurchaseOrderNumber: invoices.customerPurchaseOrderNumber,
      isCreditNote: invoices.isCreditNote,
      creditNoteReason: invoices.creditNoteReason,
      comments: invoices.comments,
      deliveryInstructions: invoices.deliveryInstructions,
      internalComments: invoices.internalComments,
      totalDryItems: invoices.totalDryItems,
      totalChillerItems: invoices.totalChillerItems,
      deliveryRun: invoices.deliveryRun,
      runPosition: invoices.runPosition,
      returnedDeliveryData: invoices.returnedDeliveryData,
      confirmedDeliveryTime: invoices.confirmedDeliveryTime ? invoices.confirmedDeliveryTime.format(DATE_TIME_FORMAT) : null,
      confirmedReceivedBy: invoices.confirmedReceivedBy,
      status: invoices.status,
      lastEditedBy: invoices.lastEditedBy,
      lastEditedWhen: invoices.lastEditedWhen ? invoices.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      contactPersonId: invoices.contactPersonId,
      salesPersonId: invoices.salesPersonId,
      packedByPersonId: invoices.packedByPersonId,
      accountsPersonId: invoices.accountsPersonId,
      customerId: invoices.customerId,
      billToCustomerId: invoices.billToCustomerId,
      deliveryMethodId: invoices.deliveryMethodId,
      orderId: invoices.orderId,
      orderPackageId: invoices.orderPackageId,
      paymentMethodId: invoices.paymentMethodId,
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
    const invoices = this.createFromForm();
    if (invoices.id !== undefined) {
      this.subscribeToSaveResponse(this.invoicesService.update(invoices));
    } else {
      this.subscribeToSaveResponse(this.invoicesService.create(invoices));
    }
  }

  private createFromForm(): IInvoices {
    return {
      ...new Invoices(),
      id: this.editForm.get(['id'])!.value,
      invoiceDate: this.editForm.get(['invoiceDate'])!.value
        ? moment(this.editForm.get(['invoiceDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerPurchaseOrderNumber: this.editForm.get(['customerPurchaseOrderNumber'])!.value,
      isCreditNote: this.editForm.get(['isCreditNote'])!.value,
      creditNoteReason: this.editForm.get(['creditNoteReason'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      deliveryInstructions: this.editForm.get(['deliveryInstructions'])!.value,
      internalComments: this.editForm.get(['internalComments'])!.value,
      totalDryItems: this.editForm.get(['totalDryItems'])!.value,
      totalChillerItems: this.editForm.get(['totalChillerItems'])!.value,
      deliveryRun: this.editForm.get(['deliveryRun'])!.value,
      runPosition: this.editForm.get(['runPosition'])!.value,
      returnedDeliveryData: this.editForm.get(['returnedDeliveryData'])!.value,
      confirmedDeliveryTime: this.editForm.get(['confirmedDeliveryTime'])!.value
        ? moment(this.editForm.get(['confirmedDeliveryTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      confirmedReceivedBy: this.editForm.get(['confirmedReceivedBy'])!.value,
      status: this.editForm.get(['status'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      contactPersonId: this.editForm.get(['contactPersonId'])!.value,
      salesPersonId: this.editForm.get(['salesPersonId'])!.value,
      packedByPersonId: this.editForm.get(['packedByPersonId'])!.value,
      accountsPersonId: this.editForm.get(['accountsPersonId'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
      billToCustomerId: this.editForm.get(['billToCustomerId'])!.value,
      deliveryMethodId: this.editForm.get(['deliveryMethodId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
      orderPackageId: this.editForm.get(['orderPackageId'])!.value,
      paymentMethodId: this.editForm.get(['paymentMethodId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoices>>): void {
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
