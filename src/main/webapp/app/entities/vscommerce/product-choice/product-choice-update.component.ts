import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductChoice, ProductChoice } from 'app/shared/model/vscommerce/product-choice.model';
import { ProductChoiceService } from './product-choice.service';
import { IProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from 'app/entities/vscommerce/product-category/product-category.service';
import { IProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';
import { ProductAttributeSetService } from 'app/entities/vscommerce/product-attribute-set/product-attribute-set.service';
import { IProductOptionSet } from 'app/shared/model/vscommerce/product-option-set.model';
import { ProductOptionSetService } from 'app/entities/vscommerce/product-option-set/product-option-set.service';

type SelectableEntity = IProductCategory | IProductAttributeSet | IProductOptionSet;

@Component({
  selector: 'jhi-product-choice-update',
  templateUrl: './product-choice-update.component.html',
})
export class ProductChoiceUpdateComponent implements OnInit {
  isSaving = false;
  productcategories: IProductCategory[] = [];
  productattributesets: IProductAttributeSet[] = [];
  productoptionsets: IProductOptionSet[] = [];

  editForm = this.fb.group({
    id: [],
    isMultiply: [null, [Validators.required]],
    productCategoryId: [],
    productAttributeSetId: [],
    productOptionSetId: [],
  });

  constructor(
    protected productChoiceService: ProductChoiceService,
    protected productCategoryService: ProductCategoryService,
    protected productAttributeSetService: ProductAttributeSetService,
    protected productOptionSetService: ProductOptionSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productChoice }) => {
      this.updateForm(productChoice);

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));

      this.productAttributeSetService
        .query()
        .subscribe((res: HttpResponse<IProductAttributeSet[]>) => (this.productattributesets = res.body || []));

      this.productOptionSetService.query().subscribe((res: HttpResponse<IProductOptionSet[]>) => (this.productoptionsets = res.body || []));
    });
  }

  updateForm(productChoice: IProductChoice): void {
    this.editForm.patchValue({
      id: productChoice.id,
      isMultiply: productChoice.isMultiply,
      productCategoryId: productChoice.productCategoryId,
      productAttributeSetId: productChoice.productAttributeSetId,
      productOptionSetId: productChoice.productOptionSetId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productChoice = this.createFromForm();
    if (productChoice.id !== undefined) {
      this.subscribeToSaveResponse(this.productChoiceService.update(productChoice));
    } else {
      this.subscribeToSaveResponse(this.productChoiceService.create(productChoice));
    }
  }

  private createFromForm(): IProductChoice {
    return {
      ...new ProductChoice(),
      id: this.editForm.get(['id'])!.value,
      isMultiply: this.editForm.get(['isMultiply'])!.value,
      productCategoryId: this.editForm.get(['productCategoryId'])!.value,
      productAttributeSetId: this.editForm.get(['productAttributeSetId'])!.value,
      productOptionSetId: this.editForm.get(['productOptionSetId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductChoice>>): void {
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
