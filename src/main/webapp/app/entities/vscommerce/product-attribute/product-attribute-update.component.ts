import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductAttribute, ProductAttribute } from 'app/shared/model/vscommerce/product-attribute.model';
import { ProductAttributeService } from './product-attribute.service';
import { IProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';
import { ProductAttributeSetService } from 'app/entities/vscommerce/product-attribute-set/product-attribute-set.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';

type SelectableEntity = IProductAttributeSet | ISuppliers;

@Component({
  selector: 'jhi-product-attribute-update',
  templateUrl: './product-attribute-update.component.html',
})
export class ProductAttributeUpdateComponent implements OnInit {
  isSaving = false;
  productattributesets: IProductAttributeSet[] = [];
  suppliers: ISuppliers[] = [];

  editForm = this.fb.group({
    id: [],
    value: [null, [Validators.required]],
    productAttributeSetId: [],
    supplierId: [],
  });

  constructor(
    protected productAttributeService: ProductAttributeService,
    protected productAttributeSetService: ProductAttributeSetService,
    protected suppliersService: SuppliersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productAttribute }) => {
      this.updateForm(productAttribute);

      this.productAttributeSetService
        .query()
        .subscribe((res: HttpResponse<IProductAttributeSet[]>) => (this.productattributesets = res.body || []));

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));
    });
  }

  updateForm(productAttribute: IProductAttribute): void {
    this.editForm.patchValue({
      id: productAttribute.id,
      value: productAttribute.value,
      productAttributeSetId: productAttribute.productAttributeSetId,
      supplierId: productAttribute.supplierId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productAttribute = this.createFromForm();
    if (productAttribute.id !== undefined) {
      this.subscribeToSaveResponse(this.productAttributeService.update(productAttribute));
    } else {
      this.subscribeToSaveResponse(this.productAttributeService.create(productAttribute));
    }
  }

  private createFromForm(): IProductAttribute {
    return {
      ...new ProductAttribute(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
      productAttributeSetId: this.editForm.get(['productAttributeSetId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductAttribute>>): void {
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
