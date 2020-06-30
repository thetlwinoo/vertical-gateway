import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductTags, ProductTags } from 'app/shared/model/vscommerce/product-tags.model';
import { ProductTagsService } from './product-tags.service';

@Component({
  selector: 'jhi-product-tags-update',
  templateUrl: './product-tags-update.component.html',
})
export class ProductTagsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected productTagsService: ProductTagsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productTags }) => {
      this.updateForm(productTags);
    });
  }

  updateForm(productTags: IProductTags): void {
    this.editForm.patchValue({
      id: productTags.id,
      name: productTags.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productTags = this.createFromForm();
    if (productTags.id !== undefined) {
      this.subscribeToSaveResponse(this.productTagsService.update(productTags));
    } else {
      this.subscribeToSaveResponse(this.productTagsService.create(productTags));
    }
  }

  private createFromForm(): IProductTags {
    return {
      ...new ProductTags(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductTags>>): void {
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
}
