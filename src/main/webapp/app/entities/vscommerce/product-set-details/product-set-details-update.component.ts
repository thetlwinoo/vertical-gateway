import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductSetDetails, ProductSetDetails } from 'app/shared/model/vscommerce/product-set-details.model';
import { ProductSetDetailsService } from './product-set-details.service';
import { IProductSet } from 'app/shared/model/vscommerce/product-set.model';
import { ProductSetService } from 'app/entities/vscommerce/product-set/product-set.service';
import { IProducts } from 'app/shared/model/vscommerce/products.model';
import { ProductsService } from 'app/entities/vscommerce/products/products.service';
import { IProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from 'app/entities/vscommerce/product-category/product-category.service';

type SelectableEntity = IProductSet | IProducts | IProductCategory;

@Component({
  selector: 'jhi-product-set-details-update',
  templateUrl: './product-set-details-update.component.html',
})
export class ProductSetDetailsUpdateComponent implements OnInit {
  isSaving = false;
  productsets: IProductSet[] = [];
  products: IProducts[] = [];
  productcategories: IProductCategory[] = [];

  editForm = this.fb.group({
    id: [],
    subGroupNo: [],
    subGroupMinCount: [],
    subGroupMinTotal: [null, [Validators.required]],
    minCount: [],
    maxCount: [],
    isOptional: [],
    productSetId: [],
    productId: [],
    productCategoryId: [],
  });

  constructor(
    protected productSetDetailsService: ProductSetDetailsService,
    protected productSetService: ProductSetService,
    protected productsService: ProductsService,
    protected productCategoryService: ProductCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productSetDetails }) => {
      this.updateForm(productSetDetails);

      this.productSetService.query().subscribe((res: HttpResponse<IProductSet[]>) => (this.productsets = res.body || []));

      this.productsService.query().subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body || []));

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));
    });
  }

  updateForm(productSetDetails: IProductSetDetails): void {
    this.editForm.patchValue({
      id: productSetDetails.id,
      subGroupNo: productSetDetails.subGroupNo,
      subGroupMinCount: productSetDetails.subGroupMinCount,
      subGroupMinTotal: productSetDetails.subGroupMinTotal,
      minCount: productSetDetails.minCount,
      maxCount: productSetDetails.maxCount,
      isOptional: productSetDetails.isOptional,
      productSetId: productSetDetails.productSetId,
      productId: productSetDetails.productId,
      productCategoryId: productSetDetails.productCategoryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productSetDetails = this.createFromForm();
    if (productSetDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.productSetDetailsService.update(productSetDetails));
    } else {
      this.subscribeToSaveResponse(this.productSetDetailsService.create(productSetDetails));
    }
  }

  private createFromForm(): IProductSetDetails {
    return {
      ...new ProductSetDetails(),
      id: this.editForm.get(['id'])!.value,
      subGroupNo: this.editForm.get(['subGroupNo'])!.value,
      subGroupMinCount: this.editForm.get(['subGroupMinCount'])!.value,
      subGroupMinTotal: this.editForm.get(['subGroupMinTotal'])!.value,
      minCount: this.editForm.get(['minCount'])!.value,
      maxCount: this.editForm.get(['maxCount'])!.value,
      isOptional: this.editForm.get(['isOptional'])!.value,
      productSetId: this.editForm.get(['productSetId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
      productCategoryId: this.editForm.get(['productCategoryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductSetDetails>>): void {
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
