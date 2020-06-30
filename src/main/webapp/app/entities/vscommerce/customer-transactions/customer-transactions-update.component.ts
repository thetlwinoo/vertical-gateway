import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerTransactions, CustomerTransactions } from 'app/shared/model/vscommerce/customer-transactions.model';
import { CustomerTransactionsService } from './customer-transactions.service';
import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { IPaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from 'app/entities/vscommerce/payment-methods/payment-methods.service';
import { ITransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';
import { TransactionTypesService } from 'app/entities/vscommerce/transaction-types/transaction-types.service';
import { IInvoices } from 'app/shared/model/vscommerce/invoices.model';
import { InvoicesService } from 'app/entities/vscommerce/invoices/invoices.service';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from 'app/entities/vscommerce/orders/orders.service';

type SelectableEntity = ICustomers | IPaymentMethods | ITransactionTypes | IInvoices | IOrders;

@Component({
  selector: 'jhi-customer-transactions-update',
  templateUrl: './customer-transactions-update.component.html',
})
export class CustomerTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomers[] = [];
  paymentmethods: IPaymentMethods[] = [];
  transactiontypes: ITransactionTypes[] = [];
  invoices: IInvoices[] = [];
  orders: IOrders[] = [];

  editForm = this.fb.group({
    id: [],
    transactionDate: [null, [Validators.required]],
    amountExcludingTax: [null, [Validators.required]],
    taxAmount: [null, [Validators.required]],
    transactionAmount: [null, [Validators.required]],
    outstandingBalance: [null, [Validators.required]],
    finalizationDate: [],
    isFinalized: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    customerId: [],
    paymentMethodId: [],
    transactionTypeId: [],
    invoiceId: [],
    orderId: [],
  });

  constructor(
    protected customerTransactionsService: CustomerTransactionsService,
    protected customersService: CustomersService,
    protected paymentMethodsService: PaymentMethodsService,
    protected transactionTypesService: TransactionTypesService,
    protected invoicesService: InvoicesService,
    protected ordersService: OrdersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerTransactions }) => {
      if (!customerTransactions.id) {
        const today = moment().startOf('day');
        customerTransactions.transactionDate = today;
        customerTransactions.finalizationDate = today;
        customerTransactions.lastEditedWhen = today;
      }

      this.updateForm(customerTransactions);

      this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));

      this.paymentMethodsService.query().subscribe((res: HttpResponse<IPaymentMethods[]>) => (this.paymentmethods = res.body || []));

      this.transactionTypesService.query().subscribe((res: HttpResponse<ITransactionTypes[]>) => (this.transactiontypes = res.body || []));

      this.invoicesService.query().subscribe((res: HttpResponse<IInvoices[]>) => (this.invoices = res.body || []));

      this.ordersService.query().subscribe((res: HttpResponse<IOrders[]>) => (this.orders = res.body || []));
    });
  }

  updateForm(customerTransactions: ICustomerTransactions): void {
    this.editForm.patchValue({
      id: customerTransactions.id,
      transactionDate: customerTransactions.transactionDate ? customerTransactions.transactionDate.format(DATE_TIME_FORMAT) : null,
      amountExcludingTax: customerTransactions.amountExcludingTax,
      taxAmount: customerTransactions.taxAmount,
      transactionAmount: customerTransactions.transactionAmount,
      outstandingBalance: customerTransactions.outstandingBalance,
      finalizationDate: customerTransactions.finalizationDate ? customerTransactions.finalizationDate.format(DATE_TIME_FORMAT) : null,
      isFinalized: customerTransactions.isFinalized,
      lastEditedBy: customerTransactions.lastEditedBy,
      lastEditedWhen: customerTransactions.lastEditedWhen ? customerTransactions.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      customerId: customerTransactions.customerId,
      paymentMethodId: customerTransactions.paymentMethodId,
      transactionTypeId: customerTransactions.transactionTypeId,
      invoiceId: customerTransactions.invoiceId,
      orderId: customerTransactions.orderId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerTransactions = this.createFromForm();
    if (customerTransactions.id !== undefined) {
      this.subscribeToSaveResponse(this.customerTransactionsService.update(customerTransactions));
    } else {
      this.subscribeToSaveResponse(this.customerTransactionsService.create(customerTransactions));
    }
  }

  private createFromForm(): ICustomerTransactions {
    return {
      ...new CustomerTransactions(),
      id: this.editForm.get(['id'])!.value,
      transactionDate: this.editForm.get(['transactionDate'])!.value
        ? moment(this.editForm.get(['transactionDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      amountExcludingTax: this.editForm.get(['amountExcludingTax'])!.value,
      taxAmount: this.editForm.get(['taxAmount'])!.value,
      transactionAmount: this.editForm.get(['transactionAmount'])!.value,
      outstandingBalance: this.editForm.get(['outstandingBalance'])!.value,
      finalizationDate: this.editForm.get(['finalizationDate'])!.value
        ? moment(this.editForm.get(['finalizationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      isFinalized: this.editForm.get(['isFinalized'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerId: this.editForm.get(['customerId'])!.value,
      paymentMethodId: this.editForm.get(['paymentMethodId'])!.value,
      transactionTypeId: this.editForm.get(['transactionTypeId'])!.value,
      invoiceId: this.editForm.get(['invoiceId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerTransactions>>): void {
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
