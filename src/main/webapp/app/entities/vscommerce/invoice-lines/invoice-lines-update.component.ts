import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInvoiceLines, InvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';
import { InvoiceLinesService } from './invoice-lines.service';
import { IPackageTypes } from 'app/shared/model/vscommerce/package-types.model';
import { PackageTypesService } from 'app/entities/vscommerce/package-types/package-types.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { IInvoices } from 'app/shared/model/vscommerce/invoices.model';
import { InvoicesService } from 'app/entities/vscommerce/invoices/invoices.service';

type SelectableEntity = IPackageTypes | IStockItems | IInvoices;

@Component({
  selector: 'jhi-invoice-lines-update',
  templateUrl: './invoice-lines-update.component.html',
})
export class InvoiceLinesUpdateComponent implements OnInit {
  isSaving = false;
  packagetypes: IPackageTypes[] = [];
  stockitems: IStockItems[] = [];
  invoices: IInvoices[] = [];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
    unitPrice: [],
    taxRate: [null, [Validators.required]],
    taxAmount: [null, [Validators.required]],
    lineProfit: [null, [Validators.required]],
    extendedPrice: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    packageTypeId: [],
    stockItemId: [],
    invoiceId: [],
  });

  constructor(
    protected invoiceLinesService: InvoiceLinesService,
    protected packageTypesService: PackageTypesService,
    protected stockItemsService: StockItemsService,
    protected invoicesService: InvoicesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoiceLines }) => {
      if (!invoiceLines.id) {
        const today = moment().startOf('day');
        invoiceLines.lastEditedWhen = today;
      }

      this.updateForm(invoiceLines);

      this.packageTypesService.query().subscribe((res: HttpResponse<IPackageTypes[]>) => (this.packagetypes = res.body || []));

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.invoicesService.query().subscribe((res: HttpResponse<IInvoices[]>) => (this.invoices = res.body || []));
    });
  }

  updateForm(invoiceLines: IInvoiceLines): void {
    this.editForm.patchValue({
      id: invoiceLines.id,
      description: invoiceLines.description,
      quantity: invoiceLines.quantity,
      unitPrice: invoiceLines.unitPrice,
      taxRate: invoiceLines.taxRate,
      taxAmount: invoiceLines.taxAmount,
      lineProfit: invoiceLines.lineProfit,
      extendedPrice: invoiceLines.extendedPrice,
      lastEditedBy: invoiceLines.lastEditedBy,
      lastEditedWhen: invoiceLines.lastEditedWhen ? invoiceLines.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      packageTypeId: invoiceLines.packageTypeId,
      stockItemId: invoiceLines.stockItemId,
      invoiceId: invoiceLines.invoiceId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoiceLines = this.createFromForm();
    if (invoiceLines.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceLinesService.update(invoiceLines));
    } else {
      this.subscribeToSaveResponse(this.invoiceLinesService.create(invoiceLines));
    }
  }

  private createFromForm(): IInvoiceLines {
    return {
      ...new InvoiceLines(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      taxRate: this.editForm.get(['taxRate'])!.value,
      taxAmount: this.editForm.get(['taxAmount'])!.value,
      lineProfit: this.editForm.get(['lineProfit'])!.value,
      extendedPrice: this.editForm.get(['extendedPrice'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      packageTypeId: this.editForm.get(['packageTypeId'])!.value,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      invoiceId: this.editForm.get(['invoiceId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoiceLines>>): void {
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
