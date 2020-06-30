import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IReceipts, Receipts } from 'app/shared/model/vscommerce/receipts.model';
import { ReceiptsService } from './receipts.service';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from 'app/entities/vscommerce/orders/orders.service';
import { IInvoices } from 'app/shared/model/vscommerce/invoices.model';
import { InvoicesService } from 'app/entities/vscommerce/invoices/invoices.service';

type SelectableEntity = IOrders | IInvoices;

@Component({
  selector: 'jhi-receipts-update',
  templateUrl: './receipts-update.component.html',
})
export class ReceiptsUpdateComponent implements OnInit {
  isSaving = false;
  orders: IOrders[] = [];
  invoices: IInvoices[] = [];

  editForm = this.fb.group({
    id: [],
    receiptNo: [null, [Validators.required]],
    issuedDate: [null, [Validators.required]],
    printCount: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    orderId: [],
    invoiceId: [],
  });

  constructor(
    protected receiptsService: ReceiptsService,
    protected ordersService: OrdersService,
    protected invoicesService: InvoicesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ receipts }) => {
      if (!receipts.id) {
        const today = moment().startOf('day');
        receipts.issuedDate = today;
        receipts.lastEditedWhen = today;
      }

      this.updateForm(receipts);

      this.ordersService.query().subscribe((res: HttpResponse<IOrders[]>) => (this.orders = res.body || []));

      this.invoicesService.query().subscribe((res: HttpResponse<IInvoices[]>) => (this.invoices = res.body || []));
    });
  }

  updateForm(receipts: IReceipts): void {
    this.editForm.patchValue({
      id: receipts.id,
      receiptNo: receipts.receiptNo,
      issuedDate: receipts.issuedDate ? receipts.issuedDate.format(DATE_TIME_FORMAT) : null,
      printCount: receipts.printCount,
      lastEditedBy: receipts.lastEditedBy,
      lastEditedWhen: receipts.lastEditedWhen ? receipts.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      orderId: receipts.orderId,
      invoiceId: receipts.invoiceId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const receipts = this.createFromForm();
    if (receipts.id !== undefined) {
      this.subscribeToSaveResponse(this.receiptsService.update(receipts));
    } else {
      this.subscribeToSaveResponse(this.receiptsService.create(receipts));
    }
  }

  private createFromForm(): IReceipts {
    return {
      ...new Receipts(),
      id: this.editForm.get(['id'])!.value,
      receiptNo: this.editForm.get(['receiptNo'])!.value,
      issuedDate: this.editForm.get(['issuedDate'])!.value ? moment(this.editForm.get(['issuedDate'])!.value, DATE_TIME_FORMAT) : undefined,
      printCount: this.editForm.get(['printCount'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      orderId: this.editForm.get(['orderId'])!.value,
      invoiceId: this.editForm.get(['invoiceId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReceipts>>): void {
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
