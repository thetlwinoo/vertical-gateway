import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductOption, ProductOption } from 'app/shared/model/vscommerce/product-option.model';
import { ProductOptionService } from './product-option.service';
import { IProductOptionSet } from 'app/shared/model/vscommerce/product-option-set.model';
import { ProductOptionSetService } from 'app/entities/vscommerce/product-option-set/product-option-set.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';

type SelectableEntity = IProductOptionSet | ISuppliers;

@Component({
  selector: 'jhi-product-option-update',
  templateUrl: './product-option-update.component.html',
})
export class ProductOptionUpdateComponent implements OnInit {
  isSaving = false;
  productoptionsets: IProductOptionSet[] = [];
  suppliers: ISuppliers[] = [];

  editForm = this.fb.group({
    id: [],
    value: [null, [Validators.required]],
    productOptionSetId: [],
    supplierId: [],
  });

  constructor(
    protected productOptionService: ProductOptionService,
    protected productOptionSetService: ProductOptionSetService,
    protected suppliersService: SuppliersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productOption }) => {
      this.updateForm(productOption);

      this.productOptionSetService.query().subscribe((res: HttpResponse<IProductOptionSet[]>) => (this.productoptionsets = res.body || []));

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));
    });
  }

  updateForm(productOption: IProductOption): void {
    this.editForm.patchValue({
      id: productOption.id,
      value: productOption.value,
      productOptionSetId: productOption.productOptionSetId,
      supplierId: productOption.supplierId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productOption = this.createFromForm();
    if (productOption.id !== undefined) {
      this.subscribeToSaveResponse(this.productOptionService.update(productOption));
    } else {
      this.subscribeToSaveResponse(this.productOptionService.create(productOption));
    }
  }

  private createFromForm(): IProductOption {
    return {
      ...new ProductOption(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
      productOptionSetId: this.editForm.get(['productOptionSetId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductOption>>): void {
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
