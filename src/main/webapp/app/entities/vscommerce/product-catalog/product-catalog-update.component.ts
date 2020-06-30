import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductCatalog, ProductCatalog } from 'app/shared/model/vscommerce/product-catalog.model';
import { ProductCatalogService } from './product-catalog.service';
import { IProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from 'app/entities/vscommerce/product-category/product-category.service';
import { IProducts } from 'app/shared/model/vscommerce/products.model';
import { ProductsService } from 'app/entities/vscommerce/products/products.service';

type SelectableEntity = IProductCategory | IProducts;

@Component({
  selector: 'jhi-product-catalog-update',
  templateUrl: './product-catalog-update.component.html',
})
export class ProductCatalogUpdateComponent implements OnInit {
  isSaving = false;
  productcategories: IProductCategory[] = [];
  products: IProducts[] = [];

  editForm = this.fb.group({
    id: [],
    productCategoryId: [],
    productId: [],
  });

  constructor(
    protected productCatalogService: ProductCatalogService,
    protected productCategoryService: ProductCategoryService,
    protected productsService: ProductsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productCatalog }) => {
      this.updateForm(productCatalog);

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));

      this.productsService.query().subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body || []));
    });
  }

  updateForm(productCatalog: IProductCatalog): void {
    this.editForm.patchValue({
      id: productCatalog.id,
      productCategoryId: productCatalog.productCategoryId,
      productId: productCatalog.productId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productCatalog = this.createFromForm();
    if (productCatalog.id !== undefined) {
      this.subscribeToSaveResponse(this.productCatalogService.update(productCatalog));
    } else {
      this.subscribeToSaveResponse(this.productCatalogService.create(productCatalog));
    }
  }

  private createFromForm(): IProductCatalog {
    return {
      ...new ProductCatalog(),
      id: this.editForm.get(['id'])!.value,
      productCategoryId: this.editForm.get(['productCategoryId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductCatalog>>): void {
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
