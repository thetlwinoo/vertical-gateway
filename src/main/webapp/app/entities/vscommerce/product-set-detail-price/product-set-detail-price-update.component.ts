import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProductSetDetailPrice, ProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';
import { ProductSetDetailPriceService } from './product-set-detail-price.service';
import { IProductSetDetails } from 'app/shared/model/vscommerce/product-set-details.model';
import { ProductSetDetailsService } from 'app/entities/vscommerce/product-set-details/product-set-details.service';

@Component({
  selector: 'jhi-product-set-detail-price-update',
  templateUrl: './product-set-detail-price-update.component.html',
})
export class ProductSetDetailPriceUpdateComponent implements OnInit {
  isSaving = false;
  productsetdetails: IProductSetDetails[] = [];

  editForm = this.fb.group({
    id: [],
    price: [null, [Validators.required]],
    startCount: [null, [Validators.required]],
    endCount: [],
    multiplyCount: [],
    startDate: [null, [Validators.required]],
    endDate: [],
    modifiedDate: [null, [Validators.required]],
    productSetDetailId: [],
  });

  constructor(
    protected productSetDetailPriceService: ProductSetDetailPriceService,
    protected productSetDetailsService: ProductSetDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productSetDetailPrice }) => {
      if (!productSetDetailPrice.id) {
        const today = moment().startOf('day');
        productSetDetailPrice.startDate = today;
        productSetDetailPrice.endDate = today;
        productSetDetailPrice.modifiedDate = today;
      }

      this.updateForm(productSetDetailPrice);

      this.productSetDetailsService
        .query()
        .subscribe((res: HttpResponse<IProductSetDetails[]>) => (this.productsetdetails = res.body || []));
    });
  }

  updateForm(productSetDetailPrice: IProductSetDetailPrice): void {
    this.editForm.patchValue({
      id: productSetDetailPrice.id,
      price: productSetDetailPrice.price,
      startCount: productSetDetailPrice.startCount,
      endCount: productSetDetailPrice.endCount,
      multiplyCount: productSetDetailPrice.multiplyCount,
      startDate: productSetDetailPrice.startDate ? productSetDetailPrice.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: productSetDetailPrice.endDate ? productSetDetailPrice.endDate.format(DATE_TIME_FORMAT) : null,
      modifiedDate: productSetDetailPrice.modifiedDate ? productSetDetailPrice.modifiedDate.format(DATE_TIME_FORMAT) : null,
      productSetDetailId: productSetDetailPrice.productSetDetailId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productSetDetailPrice = this.createFromForm();
    if (productSetDetailPrice.id !== undefined) {
      this.subscribeToSaveResponse(this.productSetDetailPriceService.update(productSetDetailPrice));
    } else {
      this.subscribeToSaveResponse(this.productSetDetailPriceService.create(productSetDetailPrice));
    }
  }

  private createFromForm(): IProductSetDetailPrice {
    return {
      ...new ProductSetDetailPrice(),
      id: this.editForm.get(['id'])!.value,
      price: this.editForm.get(['price'])!.value,
      startCount: this.editForm.get(['startCount'])!.value,
      endCount: this.editForm.get(['endCount'])!.value,
      multiplyCount: this.editForm.get(['multiplyCount'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      productSetDetailId: this.editForm.get(['productSetDetailId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductSetDetailPrice>>): void {
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

  trackById(index: number, item: IProductSetDetails): any {
    return item.id;
  }
}
