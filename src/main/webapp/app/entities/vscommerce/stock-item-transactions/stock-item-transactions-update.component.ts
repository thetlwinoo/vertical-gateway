import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStockItemTransactions, StockItemTransactions } from 'app/shared/model/vscommerce/stock-item-transactions.model';
import { StockItemTransactionsService } from './stock-item-transactions.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { IInvoices } from 'app/shared/model/vscommerce/invoices.model';
import { InvoicesService } from 'app/entities/vscommerce/invoices/invoices.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { ITransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';
import { TransactionTypesService } from 'app/entities/vscommerce/transaction-types/transaction-types.service';
import { IPurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';
import { PurchaseOrdersService } from 'app/entities/vscommerce/purchase-orders/purchase-orders.service';

type SelectableEntity = IStockItems | ICustomers | IInvoices | ISuppliers | ITransactionTypes | IPurchaseOrders;

@Component({
  selector: 'jhi-stock-item-transactions-update',
  templateUrl: './stock-item-transactions-update.component.html',
})
export class StockItemTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  stockitems: IStockItems[] = [];
  customers: ICustomers[] = [];
  invoices: IInvoices[] = [];
  suppliers: ISuppliers[] = [];
  transactiontypes: ITransactionTypes[] = [];
  purchaseorders: IPurchaseOrders[] = [];

  editForm = this.fb.group({
    id: [],
    transactionOccuredWhen: [null, [Validators.required]],
    quantity: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    stockItemId: [],
    customerId: [],
    invoiceId: [],
    supplierId: [],
    transactionTypeId: [],
    purchaseOrderId: [],
  });

  constructor(
    protected stockItemTransactionsService: StockItemTransactionsService,
    protected stockItemsService: StockItemsService,
    protected customersService: CustomersService,
    protected invoicesService: InvoicesService,
    protected suppliersService: SuppliersService,
    protected transactionTypesService: TransactionTypesService,
    protected purchaseOrdersService: PurchaseOrdersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockItemTransactions }) => {
      if (!stockItemTransactions.id) {
        const today = moment().startOf('day');
        stockItemTransactions.transactionOccuredWhen = today;
        stockItemTransactions.lastEditedWhen = today;
      }

      this.updateForm(stockItemTransactions);

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));

      this.invoicesService.query().subscribe((res: HttpResponse<IInvoices[]>) => (this.invoices = res.body || []));

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.transactionTypesService.query().subscribe((res: HttpResponse<ITransactionTypes[]>) => (this.transactiontypes = res.body || []));

      this.purchaseOrdersService.query().subscribe((res: HttpResponse<IPurchaseOrders[]>) => (this.purchaseorders = res.body || []));
    });
  }

  updateForm(stockItemTransactions: IStockItemTransactions): void {
    this.editForm.patchValue({
      id: stockItemTransactions.id,
      transactionOccuredWhen: stockItemTransactions.transactionOccuredWhen
        ? stockItemTransactions.transactionOccuredWhen.format(DATE_TIME_FORMAT)
        : null,
      quantity: stockItemTransactions.quantity,
      lastEditedBy: stockItemTransactions.lastEditedBy,
      lastEditedWhen: stockItemTransactions.lastEditedWhen ? stockItemTransactions.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      stockItemId: stockItemTransactions.stockItemId,
      customerId: stockItemTransactions.customerId,
      invoiceId: stockItemTransactions.invoiceId,
      supplierId: stockItemTransactions.supplierId,
      transactionTypeId: stockItemTransactions.transactionTypeId,
      purchaseOrderId: stockItemTransactions.purchaseOrderId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stockItemTransactions = this.createFromForm();
    if (stockItemTransactions.id !== undefined) {
      this.subscribeToSaveResponse(this.stockItemTransactionsService.update(stockItemTransactions));
    } else {
      this.subscribeToSaveResponse(this.stockItemTransactionsService.create(stockItemTransactions));
    }
  }

  private createFromForm(): IStockItemTransactions {
    return {
      ...new StockItemTransactions(),
      id: this.editForm.get(['id'])!.value,
      transactionOccuredWhen: this.editForm.get(['transactionOccuredWhen'])!.value
        ? moment(this.editForm.get(['transactionOccuredWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      quantity: this.editForm.get(['quantity'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
      invoiceId: this.editForm.get(['invoiceId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      transactionTypeId: this.editForm.get(['transactionTypeId'])!.value,
      purchaseOrderId: this.editForm.get(['purchaseOrderId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockItemTransactions>>): void {
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
