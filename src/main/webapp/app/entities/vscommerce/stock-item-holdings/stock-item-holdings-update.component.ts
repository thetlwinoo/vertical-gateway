import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStockItemHoldings, StockItemHoldings } from 'app/shared/model/vscommerce/stock-item-holdings.model';
import { StockItemHoldingsService } from './stock-item-holdings.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';

@Component({
  selector: 'jhi-stock-item-holdings-update',
  templateUrl: './stock-item-holdings-update.component.html',
})
export class StockItemHoldingsUpdateComponent implements OnInit {
  isSaving = false;
  stockitems: IStockItems[] = [];

  editForm = this.fb.group({
    id: [],
    quantityOnHand: [null, [Validators.required]],
    binLocation: [null, [Validators.required]],
    lastStockTakeQuantity: [null, [Validators.required]],
    lastCostPrice: [null, [Validators.required]],
    reorderLevel: [null, [Validators.required]],
    targerStockLevel: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    stockItemId: [],
  });

  constructor(
    protected stockItemHoldingsService: StockItemHoldingsService,
    protected stockItemsService: StockItemsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockItemHoldings }) => {
      if (!stockItemHoldings.id) {
        const today = moment().startOf('day');
        stockItemHoldings.lastEditedWhen = today;
      }

      this.updateForm(stockItemHoldings);

      this.stockItemsService
        .query({ 'stockItemHoldingId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IStockItems[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IStockItems[]) => {
          if (!stockItemHoldings.stockItemId) {
            this.stockitems = resBody;
          } else {
            this.stockItemsService
              .find(stockItemHoldings.stockItemId)
              .pipe(
                map((subRes: HttpResponse<IStockItems>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IStockItems[]) => (this.stockitems = concatRes));
          }
        });
    });
  }

  updateForm(stockItemHoldings: IStockItemHoldings): void {
    this.editForm.patchValue({
      id: stockItemHoldings.id,
      quantityOnHand: stockItemHoldings.quantityOnHand,
      binLocation: stockItemHoldings.binLocation,
      lastStockTakeQuantity: stockItemHoldings.lastStockTakeQuantity,
      lastCostPrice: stockItemHoldings.lastCostPrice,
      reorderLevel: stockItemHoldings.reorderLevel,
      targerStockLevel: stockItemHoldings.targerStockLevel,
      lastEditedBy: stockItemHoldings.lastEditedBy,
      lastEditedWhen: stockItemHoldings.lastEditedWhen ? stockItemHoldings.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      stockItemId: stockItemHoldings.stockItemId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stockItemHoldings = this.createFromForm();
    if (stockItemHoldings.id !== undefined) {
      this.subscribeToSaveResponse(this.stockItemHoldingsService.update(stockItemHoldings));
    } else {
      this.subscribeToSaveResponse(this.stockItemHoldingsService.create(stockItemHoldings));
    }
  }

  private createFromForm(): IStockItemHoldings {
    return {
      ...new StockItemHoldings(),
      id: this.editForm.get(['id'])!.value,
      quantityOnHand: this.editForm.get(['quantityOnHand'])!.value,
      binLocation: this.editForm.get(['binLocation'])!.value,
      lastStockTakeQuantity: this.editForm.get(['lastStockTakeQuantity'])!.value,
      lastCostPrice: this.editForm.get(['lastCostPrice'])!.value,
      reorderLevel: this.editForm.get(['reorderLevel'])!.value,
      targerStockLevel: this.editForm.get(['targerStockLevel'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockItemHoldings>>): void {
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

  trackById(index: number, item: IStockItems): any {
    return item.id;
  }
}
