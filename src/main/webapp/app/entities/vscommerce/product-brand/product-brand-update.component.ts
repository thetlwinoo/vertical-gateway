import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductBrand, ProductBrand } from 'app/shared/model/vscommerce/product-brand.model';
import { ProductBrandService } from './product-brand.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';

type SelectableEntity = ISuppliers | IPhotos;

@Component({
  selector: 'jhi-product-brand-update',
  templateUrl: './product-brand-update.component.html',
})
export class ProductBrandUpdateComponent implements OnInit {
  isSaving = false;
  suppliers: ISuppliers[] = [];
  photos: IPhotos[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    shortLabel: [],
    sortOrder: [],
    iconFont: [],
    thumbnailUrl: [],
    supplierId: [],
    iconId: [],
  });

  constructor(
    protected productBrandService: ProductBrandService,
    protected suppliersService: SuppliersService,
    protected photosService: PhotosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productBrand }) => {
      this.updateForm(productBrand);

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));
    });
  }

  updateForm(productBrand: IProductBrand): void {
    this.editForm.patchValue({
      id: productBrand.id,
      name: productBrand.name,
      shortLabel: productBrand.shortLabel,
      sortOrder: productBrand.sortOrder,
      iconFont: productBrand.iconFont,
      thumbnailUrl: productBrand.thumbnailUrl,
      supplierId: productBrand.supplierId,
      iconId: productBrand.iconId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productBrand = this.createFromForm();
    if (productBrand.id !== undefined) {
      this.subscribeToSaveResponse(this.productBrandService.update(productBrand));
    } else {
      this.subscribeToSaveResponse(this.productBrandService.create(productBrand));
    }
  }

  private createFromForm(): IProductBrand {
    return {
      ...new ProductBrand(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      shortLabel: this.editForm.get(['shortLabel'])!.value,
      sortOrder: this.editForm.get(['sortOrder'])!.value,
      iconFont: this.editForm.get(['iconFont'])!.value,
      thumbnailUrl: this.editForm.get(['thumbnailUrl'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      iconId: this.editForm.get(['iconId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductBrand>>): void {
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
