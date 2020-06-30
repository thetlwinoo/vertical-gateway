import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDiscountDetails, DiscountDetails } from 'app/shared/model/vscommerce/discount-details.model';
import { DiscountDetailsService } from './discount-details.service';
import { IDiscount } from 'app/shared/model/vscommerce/discount.model';
import { DiscountService } from 'app/entities/vscommerce/discount/discount.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { IProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from 'app/entities/vscommerce/product-category/product-category.service';

type SelectableEntity = IDiscount | IStockItems | IProductCategory;

@Component({
  selector: 'jhi-discount-details-update',
  templateUrl: './discount-details-update.component.html',
})
export class DiscountDetailsUpdateComponent implements OnInit {
  isSaving = false;
  discounts: IDiscount[] = [];
  stockitems: IStockItems[] = [];
  productcategories: IProductCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    isPercentage: [null, [Validators.required]],
    isAllowCombinationDiscount: [null, [Validators.required]],
    isFinalBillDiscount: [null, [Validators.required]],
    startCount: [],
    endCount: [],
    multiplyCount: [],
    minAmount: [],
    maxAmount: [],
    minVolumeWeight: [],
    maxVolumeWeight: [],
    modifiedDate: [null, [Validators.required]],
    discountId: [],
    stockItemId: [],
    productCategoryId: [],
  });

  constructor(
    protected discountDetailsService: DiscountDetailsService,
    protected discountService: DiscountService,
    protected stockItemsService: StockItemsService,
    protected productCategoryService: ProductCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discountDetails }) => {
      if (!discountDetails.id) {
        const today = moment().startOf('day');
        discountDetails.modifiedDate = today;
      }

      this.updateForm(discountDetails);

      this.discountService.query().subscribe((res: HttpResponse<IDiscount[]>) => (this.discounts = res.body || []));

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));
    });
  }

  updateForm(discountDetails: IDiscountDetails): void {
    this.editForm.patchValue({
      id: discountDetails.id,
      name: discountDetails.name,
      amount: discountDetails.amount,
      isPercentage: discountDetails.isPercentage,
      isAllowCombinationDiscount: discountDetails.isAllowCombinationDiscount,
      isFinalBillDiscount: discountDetails.isFinalBillDiscount,
      startCount: discountDetails.startCount,
      endCount: discountDetails.endCount,
      multiplyCount: discountDetails.multiplyCount,
      minAmount: discountDetails.minAmount,
      maxAmount: discountDetails.maxAmount,
      minVolumeWeight: discountDetails.minVolumeWeight,
      maxVolumeWeight: discountDetails.maxVolumeWeight,
      modifiedDate: discountDetails.modifiedDate ? discountDetails.modifiedDate.format(DATE_TIME_FORMAT) : null,
      discountId: discountDetails.discountId,
      stockItemId: discountDetails.stockItemId,
      productCategoryId: discountDetails.productCategoryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const discountDetails = this.createFromForm();
    if (discountDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.discountDetailsService.update(discountDetails));
    } else {
      this.subscribeToSaveResponse(this.discountDetailsService.create(discountDetails));
    }
  }

  private createFromForm(): IDiscountDetails {
    return {
      ...new DiscountDetails(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      isPercentage: this.editForm.get(['isPercentage'])!.value,
      isAllowCombinationDiscount: this.editForm.get(['isAllowCombinationDiscount'])!.value,
      isFinalBillDiscount: this.editForm.get(['isFinalBillDiscount'])!.value,
      startCount: this.editForm.get(['startCount'])!.value,
      endCount: this.editForm.get(['endCount'])!.value,
      multiplyCount: this.editForm.get(['multiplyCount'])!.value,
      minAmount: this.editForm.get(['minAmount'])!.value,
      maxAmount: this.editForm.get(['maxAmount'])!.value,
      minVolumeWeight: this.editForm.get(['minVolumeWeight'])!.value,
      maxVolumeWeight: this.editForm.get(['maxVolumeWeight'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      discountId: this.editForm.get(['discountId'])!.value,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      productCategoryId: this.editForm.get(['productCategoryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiscountDetails>>): void {
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
