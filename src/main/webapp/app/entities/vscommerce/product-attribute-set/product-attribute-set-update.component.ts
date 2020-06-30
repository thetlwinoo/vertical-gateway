import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductAttributeSet, ProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';
import { ProductAttributeSetService } from './product-attribute-set.service';
import { IProductOptionSet } from 'app/shared/model/vscommerce/product-option-set.model';
import { ProductOptionSetService } from 'app/entities/vscommerce/product-option-set/product-option-set.service';

@Component({
  selector: 'jhi-product-attribute-set-update',
  templateUrl: './product-attribute-set-update.component.html',
})
export class ProductAttributeSetUpdateComponent implements OnInit {
  isSaving = false;
  productoptionsets: IProductOptionSet[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    productOptionSetId: [],
  });

  constructor(
    protected productAttributeSetService: ProductAttributeSetService,
    protected productOptionSetService: ProductOptionSetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productAttributeSet }) => {
      this.updateForm(productAttributeSet);

      this.productOptionSetService.query().subscribe((res: HttpResponse<IProductOptionSet[]>) => (this.productoptionsets = res.body || []));
    });
  }

  updateForm(productAttributeSet: IProductAttributeSet): void {
    this.editForm.patchValue({
      id: productAttributeSet.id,
      name: productAttributeSet.name,
      productOptionSetId: productAttributeSet.productOptionSetId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productAttributeSet = this.createFromForm();
    if (productAttributeSet.id !== undefined) {
      this.subscribeToSaveResponse(this.productAttributeSetService.update(productAttributeSet));
    } else {
      this.subscribeToSaveResponse(this.productAttributeSetService.create(productAttributeSet));
    }
  }

  private createFromForm(): IProductAttributeSet {
    return {
      ...new ProductAttributeSet(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      productOptionSetId: this.editForm.get(['productOptionSetId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductAttributeSet>>): void {
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

  trackById(index: number, item: IProductOptionSet): any {
    return item.id;
  }
}
