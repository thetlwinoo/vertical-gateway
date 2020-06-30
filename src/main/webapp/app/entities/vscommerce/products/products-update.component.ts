import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProducts, Products } from 'app/shared/model/vscommerce/products.model';
import { ProductsService } from './products.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IProductDocument } from 'app/shared/model/vscommerce/product-document.model';
import { ProductDocumentService } from 'app/entities/vscommerce/product-document/product-document.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from 'app/entities/vscommerce/product-category/product-category.service';
import { IProductBrand } from 'app/shared/model/vscommerce/product-brand.model';
import { ProductBrandService } from 'app/entities/vscommerce/product-brand/product-brand.service';

type SelectableEntity = IProductDocument | ISuppliers | IProductCategory | IProductBrand;

@Component({
  selector: 'jhi-products-update',
  templateUrl: './products-update.component.html',
})
export class ProductsUpdateComponent implements OnInit {
  isSaving = false;
  productdocuments: IProductDocument[] = [];
  suppliers: ISuppliers[] = [];
  productcategories: IProductCategory[] = [];
  productbrands: IProductBrand[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    handle: [],
    searchDetails: [],
    productNumber: [],
    sellCount: [],
    productDetails: [],
    totalWishlist: [],
    totalStars: [],
    discountedPercentage: [],
    preferredInd: [],
    availableDeliveryInd: [],
    activeInd: [],
    questionsAboutProductInd: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    releaseDate: [null, [Validators.required]],
    availableDate: [null, [Validators.required]],
    productDocumentId: [],
    supplierId: [],
    productCategoryId: [],
    productBrandId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected productsService: ProductsService,
    protected productDocumentService: ProductDocumentService,
    protected suppliersService: SuppliersService,
    protected productCategoryService: ProductCategoryService,
    protected productBrandService: ProductBrandService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ products }) => {
      if (!products.id) {
        const today = moment().startOf('day');
        products.lastEditedWhen = today;
        products.releaseDate = today;
        products.availableDate = today;
      }

      this.updateForm(products);

      this.productDocumentService
        .query({ 'productId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IProductDocument[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProductDocument[]) => {
          if (!products.productDocumentId) {
            this.productdocuments = resBody;
          } else {
            this.productDocumentService
              .find(products.productDocumentId)
              .pipe(
                map((subRes: HttpResponse<IProductDocument>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProductDocument[]) => (this.productdocuments = concatRes));
          }
        });

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));

      this.productBrandService.query().subscribe((res: HttpResponse<IProductBrand[]>) => (this.productbrands = res.body || []));
    });
  }

  updateForm(products: IProducts): void {
    this.editForm.patchValue({
      id: products.id,
      name: products.name,
      handle: products.handle,
      searchDetails: products.searchDetails,
      productNumber: products.productNumber,
      sellCount: products.sellCount,
      productDetails: products.productDetails,
      totalWishlist: products.totalWishlist,
      totalStars: products.totalStars,
      discountedPercentage: products.discountedPercentage,
      preferredInd: products.preferredInd,
      availableDeliveryInd: products.availableDeliveryInd,
      activeInd: products.activeInd,
      questionsAboutProductInd: products.questionsAboutProductInd,
      lastEditedBy: products.lastEditedBy,
      lastEditedWhen: products.lastEditedWhen ? products.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      releaseDate: products.releaseDate ? products.releaseDate.format(DATE_TIME_FORMAT) : null,
      availableDate: products.availableDate ? products.availableDate.format(DATE_TIME_FORMAT) : null,
      productDocumentId: products.productDocumentId,
      supplierId: products.supplierId,
      productCategoryId: products.productCategoryId,
      productBrandId: products.productBrandId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const products = this.createFromForm();
    if (products.id !== undefined) {
      this.subscribeToSaveResponse(this.productsService.update(products));
    } else {
      this.subscribeToSaveResponse(this.productsService.create(products));
    }
  }

  private createFromForm(): IProducts {
    return {
      ...new Products(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      handle: this.editForm.get(['handle'])!.value,
      searchDetails: this.editForm.get(['searchDetails'])!.value,
      productNumber: this.editForm.get(['productNumber'])!.value,
      sellCount: this.editForm.get(['sellCount'])!.value,
      productDetails: this.editForm.get(['productDetails'])!.value,
      totalWishlist: this.editForm.get(['totalWishlist'])!.value,
      totalStars: this.editForm.get(['totalStars'])!.value,
      discountedPercentage: this.editForm.get(['discountedPercentage'])!.value,
      preferredInd: this.editForm.get(['preferredInd'])!.value,
      availableDeliveryInd: this.editForm.get(['availableDeliveryInd'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      questionsAboutProductInd: this.editForm.get(['questionsAboutProductInd'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      releaseDate: this.editForm.get(['releaseDate'])!.value
        ? moment(this.editForm.get(['releaseDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      availableDate: this.editForm.get(['availableDate'])!.value
        ? moment(this.editForm.get(['availableDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      productDocumentId: this.editForm.get(['productDocumentId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      productCategoryId: this.editForm.get(['productCategoryId'])!.value,
      productBrandId: this.editForm.get(['productBrandId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducts>>): void {
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
