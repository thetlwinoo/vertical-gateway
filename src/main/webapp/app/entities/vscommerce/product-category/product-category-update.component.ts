import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductCategory, ProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';

type SelectableEntity = IProductCategory | IPhotos;

@Component({
  selector: 'jhi-product-category-update',
  templateUrl: './product-category-update.component.html',
})
export class ProductCategoryUpdateComponent implements OnInit {
  isSaving = false;
  productcategories: IProductCategory[] = [];
  photos: IPhotos[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    shortLabel: [],
    sortOrder: [],
    iconFont: [],
    parentId: [],
    iconId: [],
  });

  constructor(
    protected productCategoryService: ProductCategoryService,
    protected photosService: PhotosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productCategory }) => {
      this.updateForm(productCategory);

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));
    });
  }

  updateForm(productCategory: IProductCategory): void {
    this.editForm.patchValue({
      id: productCategory.id,
      name: productCategory.name,
      shortLabel: productCategory.shortLabel,
      sortOrder: productCategory.sortOrder,
      iconFont: productCategory.iconFont,
      parentId: productCategory.parentId,
      iconId: productCategory.iconId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productCategory = this.createFromForm();
    if (productCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.productCategoryService.update(productCategory));
    } else {
      this.subscribeToSaveResponse(this.productCategoryService.create(productCategory));
    }
  }

  private createFromForm(): IProductCategory {
    return {
      ...new ProductCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      shortLabel: this.editForm.get(['shortLabel'])!.value,
      sortOrder: this.editForm.get(['sortOrder'])!.value,
      iconFont: this.editForm.get(['iconFont'])!.value,
      parentId: this.editForm.get(['parentId'])!.value,
      iconId: this.editForm.get(['iconId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductCategory>>): void {
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
