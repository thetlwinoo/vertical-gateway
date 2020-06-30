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
import { IProducts } from 'app/shared/model/vscommerce/products.model';
import { ProductsService } from 'app/entities/vscommerce/products/products.service';
import { IProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from 'app/entities/vscommerce/product-category/product-category.service';

type SelectableEntity = IDiscount | IProducts | IProductCategory;

@Component({
  selector: 'jhi-discount-details-update',
  templateUrl: './discount-details-update.component.html',
})
export class DiscountDetailsUpdateComponent implements OnInit {
  isSaving = false;
  discounts: IDiscount[] = [];
  products: IProducts[] = [];
  productcategories: IProductCategory[] = [];

  editForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required]],
    isPercentage: [null, [Validators.required]],
    isAllowCombinationDiscount: [null, [Validators.required]],
    isFinalBillDiscount: [null, [Validators.required]],
    name: [null, [Validators.required]],
    startCount: [null, [Validators.required]],
    endCount: [],
    multiplyCount: [null, [Validators.required]],
    modifiedDate: [null, [Validators.required]],
    discountId: [],
    productId: [],
    productCategoryId: [],
  });

  constructor(
    protected discountDetailsService: DiscountDetailsService,
    protected discountService: DiscountService,
    protected productsService: ProductsService,
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

      this.productsService.query().subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body || []));

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));
    });
  }

  updateForm(discountDetails: IDiscountDetails): void {
    this.editForm.patchValue({
      id: discountDetails.id,
      amount: discountDetails.amount,
      isPercentage: discountDetails.isPercentage,
      isAllowCombinationDiscount: discountDetails.isAllowCombinationDiscount,
      isFinalBillDiscount: discountDetails.isFinalBillDiscount,
      name: discountDetails.name,
      startCount: discountDetails.startCount,
      endCount: discountDetails.endCount,
      multiplyCount: discountDetails.multiplyCount,
      modifiedDate: discountDetails.modifiedDate ? discountDetails.modifiedDate.format(DATE_TIME_FORMAT) : null,
      discountId: discountDetails.discountId,
      productId: discountDetails.productId,
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
      amount: this.editForm.get(['amount'])!.value,
      isPercentage: this.editForm.get(['isPercentage'])!.value,
      isAllowCombinationDiscount: this.editForm.get(['isAllowCombinationDiscount'])!.value,
      isFinalBillDiscount: this.editForm.get(['isFinalBillDiscount'])!.value,
      name: this.editForm.get(['name'])!.value,
      startCount: this.editForm.get(['startCount'])!.value,
      endCount: this.editForm.get(['endCount'])!.value,
      multiplyCount: this.editForm.get(['multiplyCount'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      discountId: this.editForm.get(['discountId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
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
