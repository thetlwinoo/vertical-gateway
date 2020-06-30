import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrderLines, OrderLines } from 'app/shared/model/vscommerce/order-lines.model';
import { OrderLinesService } from './order-lines.service';
import { IReviewLines } from 'app/shared/model/vscommerce/review-lines.model';
import { ReviewLinesService } from 'app/entities/vscommerce/review-lines/review-lines.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { IPackageTypes } from 'app/shared/model/vscommerce/package-types.model';
import { PackageTypesService } from 'app/entities/vscommerce/package-types/package-types.service';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from 'app/entities/vscommerce/orders/orders.service';

type SelectableEntity = IReviewLines | ISuppliers | IStockItems | IPackageTypes | IOrders;

@Component({
  selector: 'jhi-order-lines-update',
  templateUrl: './order-lines-update.component.html',
})
export class OrderLinesUpdateComponent implements OnInit {
  isSaving = false;
  reviewlines: IReviewLines[] = [];
  suppliers: ISuppliers[] = [];
  stockitems: IStockItems[] = [];
  packagetypes: IPackageTypes[] = [];
  orders: IOrders[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required]],
    description: [],
    unitPrice: [],
    unitPriceDiscount: [],
    lineTotal: [],
    taxRate: [],
    pickedQuantity: [],
    pickingCompletedWhen: [],
    status: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    reviewLineId: [],
    supplierId: [],
    stockItemId: [],
    packageTypeId: [],
    orderId: [],
  });

  constructor(
    protected orderLinesService: OrderLinesService,
    protected reviewLinesService: ReviewLinesService,
    protected suppliersService: SuppliersService,
    protected stockItemsService: StockItemsService,
    protected packageTypesService: PackageTypesService,
    protected ordersService: OrdersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderLines }) => {
      if (!orderLines.id) {
        const today = moment().startOf('day');
        orderLines.pickingCompletedWhen = today;
        orderLines.lastEditedWhen = today;
      }

      this.updateForm(orderLines);

      this.reviewLinesService
        .query({ 'orderLineId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IReviewLines[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IReviewLines[]) => {
          if (!orderLines.reviewLineId) {
            this.reviewlines = resBody;
          } else {
            this.reviewLinesService
              .find(orderLines.reviewLineId)
              .pipe(
                map((subRes: HttpResponse<IReviewLines>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IReviewLines[]) => (this.reviewlines = concatRes));
          }
        });

      this.suppliersService
        .query({ 'orderLinesId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<ISuppliers[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISuppliers[]) => {
          if (!orderLines.supplierId) {
            this.suppliers = resBody;
          } else {
            this.suppliersService
              .find(orderLines.supplierId)
              .pipe(
                map((subRes: HttpResponse<ISuppliers>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISuppliers[]) => (this.suppliers = concatRes));
          }
        });

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.packageTypesService.query().subscribe((res: HttpResponse<IPackageTypes[]>) => (this.packagetypes = res.body || []));

      this.ordersService.query().subscribe((res: HttpResponse<IOrders[]>) => (this.orders = res.body || []));
    });
  }

  updateForm(orderLines: IOrderLines): void {
    this.editForm.patchValue({
      id: orderLines.id,
      quantity: orderLines.quantity,
      description: orderLines.description,
      unitPrice: orderLines.unitPrice,
      unitPriceDiscount: orderLines.unitPriceDiscount,
      lineTotal: orderLines.lineTotal,
      taxRate: orderLines.taxRate,
      pickedQuantity: orderLines.pickedQuantity,
      pickingCompletedWhen: orderLines.pickingCompletedWhen ? orderLines.pickingCompletedWhen.format(DATE_TIME_FORMAT) : null,
      status: orderLines.status,
      lastEditedBy: orderLines.lastEditedBy,
      lastEditedWhen: orderLines.lastEditedWhen ? orderLines.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      reviewLineId: orderLines.reviewLineId,
      supplierId: orderLines.supplierId,
      stockItemId: orderLines.stockItemId,
      packageTypeId: orderLines.packageTypeId,
      orderId: orderLines.orderId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderLines = this.createFromForm();
    if (orderLines.id !== undefined) {
      this.subscribeToSaveResponse(this.orderLinesService.update(orderLines));
    } else {
      this.subscribeToSaveResponse(this.orderLinesService.create(orderLines));
    }
  }

  private createFromForm(): IOrderLines {
    return {
      ...new OrderLines(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      description: this.editForm.get(['description'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      unitPriceDiscount: this.editForm.get(['unitPriceDiscount'])!.value,
      lineTotal: this.editForm.get(['lineTotal'])!.value,
      taxRate: this.editForm.get(['taxRate'])!.value,
      pickedQuantity: this.editForm.get(['pickedQuantity'])!.value,
      pickingCompletedWhen: this.editForm.get(['pickingCompletedWhen'])!.value
        ? moment(this.editForm.get(['pickingCompletedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      status: this.editForm.get(['status'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      reviewLineId: this.editForm.get(['reviewLineId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      packageTypeId: this.editForm.get(['packageTypeId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderLines>>): void {
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
