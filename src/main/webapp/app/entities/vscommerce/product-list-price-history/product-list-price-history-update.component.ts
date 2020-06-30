import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProductListPriceHistory, ProductListPriceHistory } from 'app/shared/model/vscommerce/product-list-price-history.model';
import { ProductListPriceHistoryService } from './product-list-price-history.service';
import { IProducts } from 'app/shared/model/vscommerce/products.model';
import { ProductsService } from 'app/entities/vscommerce/products/products.service';

@Component({
  selector: 'jhi-product-list-price-history-update',
  templateUrl: './product-list-price-history-update.component.html',
})
export class ProductListPriceHistoryUpdateComponent implements OnInit {
  isSaving = false;
  products: IProducts[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [null, [Validators.required]],
    endDate: [],
    listPrice: [null, [Validators.required]],
    modifiedDate: [null, [Validators.required]],
    productId: [],
  });

  constructor(
    protected productListPriceHistoryService: ProductListPriceHistoryService,
    protected productsService: ProductsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productListPriceHistory }) => {
      if (!productListPriceHistory.id) {
        const today = moment().startOf('day');
        productListPriceHistory.startDate = today;
        productListPriceHistory.endDate = today;
        productListPriceHistory.modifiedDate = today;
      }

      this.updateForm(productListPriceHistory);

      this.productsService.query().subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body || []));
    });
  }

  updateForm(productListPriceHistory: IProductListPriceHistory): void {
    this.editForm.patchValue({
      id: productListPriceHistory.id,
      startDate: productListPriceHistory.startDate ? productListPriceHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: productListPriceHistory.endDate ? productListPriceHistory.endDate.format(DATE_TIME_FORMAT) : null,
      listPrice: productListPriceHistory.listPrice,
      modifiedDate: productListPriceHistory.modifiedDate ? productListPriceHistory.modifiedDate.format(DATE_TIME_FORMAT) : null,
      productId: productListPriceHistory.productId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productListPriceHistory = this.createFromForm();
    if (productListPriceHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.productListPriceHistoryService.update(productListPriceHistory));
    } else {
      this.subscribeToSaveResponse(this.productListPriceHistoryService.create(productListPriceHistory));
    }
  }

  private createFromForm(): IProductListPriceHistory {
    return {
      ...new ProductListPriceHistory(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      listPrice: this.editForm.get(['listPrice'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      productId: this.editForm.get(['productId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductListPriceHistory>>): void {
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

  trackById(index: number, item: IProducts): any {
    return item.id;
  }
}
