import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISupplierTransactions, SupplierTransactions } from 'app/shared/model/vscommerce/supplier-transactions.model';
import { SupplierTransactionsService } from './supplier-transactions.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { ITransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';
import { TransactionTypesService } from 'app/entities/vscommerce/transaction-types/transaction-types.service';
import { IPurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';
import { PurchaseOrdersService } from 'app/entities/vscommerce/purchase-orders/purchase-orders.service';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from 'app/entities/vscommerce/orders/orders.service';
import { IInvoices } from 'app/shared/model/vscommerce/invoices.model';
import { InvoicesService } from 'app/entities/vscommerce/invoices/invoices.service';
import { ISupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';
import { SupplierTransactionStatusService } from 'app/entities/vscommerce/supplier-transaction-status/supplier-transaction-status.service';

type SelectableEntity = ISuppliers | ITransactionTypes | IPurchaseOrders | IOrders | IInvoices | ISupplierTransactionStatus;

@Component({
  selector: 'jhi-supplier-transactions-update',
  templateUrl: './supplier-transactions-update.component.html',
})
export class SupplierTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  suppliers: ISuppliers[] = [];
  transactiontypes: ITransactionTypes[] = [];
  purchaseorders: IPurchaseOrders[] = [];
  orders: IOrders[] = [];
  invoices: IInvoices[] = [];
  suppliertransactionstatuses: ISupplierTransactionStatus[] = [];

  editForm = this.fb.group({
    id: [],
    supplierInvoiceNumber: [],
    transactionDate: [null, [Validators.required]],
    amountExcludingTax: [null, [Validators.required]],
    taxAmount: [null, [Validators.required]],
    transactionAmount: [null, [Validators.required]],
    outstandingBalance: [null, [Validators.required]],
    finalizationDate: [],
    isFinalized: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    supplierId: [],
    transactionTypeId: [],
    purchaseOrderId: [],
    orderId: [],
    invoiceId: [],
    statusId: [],
  });

  constructor(
    protected supplierTransactionsService: SupplierTransactionsService,
    protected suppliersService: SuppliersService,
    protected transactionTypesService: TransactionTypesService,
    protected purchaseOrdersService: PurchaseOrdersService,
    protected ordersService: OrdersService,
    protected invoicesService: InvoicesService,
    protected supplierTransactionStatusService: SupplierTransactionStatusService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierTransactions }) => {
      if (!supplierTransactions.id) {
        const today = moment().startOf('day');
        supplierTransactions.transactionDate = today;
        supplierTransactions.finalizationDate = today;
        supplierTransactions.lastEditedWhen = today;
      }

      this.updateForm(supplierTransactions);

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.transactionTypesService.query().subscribe((res: HttpResponse<ITransactionTypes[]>) => (this.transactiontypes = res.body || []));

      this.purchaseOrdersService.query().subscribe((res: HttpResponse<IPurchaseOrders[]>) => (this.purchaseorders = res.body || []));

      this.ordersService.query().subscribe((res: HttpResponse<IOrders[]>) => (this.orders = res.body || []));

      this.invoicesService.query().subscribe((res: HttpResponse<IInvoices[]>) => (this.invoices = res.body || []));

      this.supplierTransactionStatusService
        .query()
        .subscribe((res: HttpResponse<ISupplierTransactionStatus[]>) => (this.suppliertransactionstatuses = res.body || []));
    });
  }

  updateForm(supplierTransactions: ISupplierTransactions): void {
    this.editForm.patchValue({
      id: supplierTransactions.id,
      supplierInvoiceNumber: supplierTransactions.supplierInvoiceNumber,
      transactionDate: supplierTransactions.transactionDate ? supplierTransactions.transactionDate.format(DATE_TIME_FORMAT) : null,
      amountExcludingTax: supplierTransactions.amountExcludingTax,
      taxAmount: supplierTransactions.taxAmount,
      transactionAmount: supplierTransactions.transactionAmount,
      outstandingBalance: supplierTransactions.outstandingBalance,
      finalizationDate: supplierTransactions.finalizationDate ? supplierTransactions.finalizationDate.format(DATE_TIME_FORMAT) : null,
      isFinalized: supplierTransactions.isFinalized,
      lastEditedBy: supplierTransactions.lastEditedBy,
      lastEditedWhen: supplierTransactions.lastEditedWhen ? supplierTransactions.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      supplierId: supplierTransactions.supplierId,
      transactionTypeId: supplierTransactions.transactionTypeId,
      purchaseOrderId: supplierTransactions.purchaseOrderId,
      orderId: supplierTransactions.orderId,
      invoiceId: supplierTransactions.invoiceId,
      statusId: supplierTransactions.statusId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplierTransactions = this.createFromForm();
    if (supplierTransactions.id !== undefined) {
      this.subscribeToSaveResponse(this.supplierTransactionsService.update(supplierTransactions));
    } else {
      this.subscribeToSaveResponse(this.supplierTransactionsService.create(supplierTransactions));
    }
  }

  private createFromForm(): ISupplierTransactions {
    return {
      ...new SupplierTransactions(),
      id: this.editForm.get(['id'])!.value,
      supplierInvoiceNumber: this.editForm.get(['supplierInvoiceNumber'])!.value,
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
      supplierId: this.editForm.get(['supplierId'])!.value,
      transactionTypeId: this.editForm.get(['transactionTypeId'])!.value,
      purchaseOrderId: this.editForm.get(['purchaseOrderId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
      invoiceId: this.editForm.get(['invoiceId'])!.value,
      statusId: this.editForm.get(['statusId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplierTransactions>>): void {
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
