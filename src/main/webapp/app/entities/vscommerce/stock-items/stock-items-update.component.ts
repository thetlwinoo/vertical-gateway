import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStockItems, StockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from './stock-items.service';
import { IReviewLines } from 'app/shared/model/vscommerce/review-lines.model';
import { ReviewLinesService } from 'app/entities/vscommerce/review-lines/review-lines.service';
import { IUnitMeasure } from 'app/shared/model/vscommerce/unit-measure.model';
import { UnitMeasureService } from 'app/entities/vscommerce/unit-measure/unit-measure.service';
import { IProductAttribute } from 'app/shared/model/vscommerce/product-attribute.model';
import { ProductAttributeService } from 'app/entities/vscommerce/product-attribute/product-attribute.service';
import { IProductOption } from 'app/shared/model/vscommerce/product-option.model';
import { ProductOptionService } from 'app/entities/vscommerce/product-option/product-option.service';
import { IMaterials } from 'app/shared/model/vscommerce/materials.model';
import { MaterialsService } from 'app/entities/vscommerce/materials/materials.service';
import { ICurrency } from 'app/shared/model/vscommerce/currency.model';
import { CurrencyService } from 'app/entities/vscommerce/currency/currency.service';
import { IBarcodeTypes } from 'app/shared/model/vscommerce/barcode-types.model';
import { BarcodeTypesService } from 'app/entities/vscommerce/barcode-types/barcode-types.service';
import { IProducts } from 'app/shared/model/vscommerce/products.model';
import { ProductsService } from 'app/entities/vscommerce/products/products.service';

type SelectableEntity =
  | IReviewLines
  | IUnitMeasure
  | IProductAttribute
  | IProductOption
  | IMaterials
  | ICurrency
  | IBarcodeTypes
  | IProducts;

@Component({
  selector: 'jhi-stock-items-update',
  templateUrl: './stock-items-update.component.html',
})
export class StockItemsUpdateComponent implements OnInit {
  isSaving = false;
  reviewlines: IReviewLines[] = [];
  unitmeasures: IUnitMeasure[] = [];
  productattributes: IProductAttribute[] = [];
  productoptions: IProductOption[] = [];
  materials: IMaterials[] = [];
  currencies: ICurrency[] = [];
  barcodetypes: IBarcodeTypes[] = [];
  products: IProducts[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    vendorCode: [],
    vendorSKU: [],
    generatedSKU: [],
    barcode: [],
    unitPrice: [null, [Validators.required]],
    recommendedRetailPrice: [],
    quantityOnHand: [null, [Validators.required]],
    itemLength: [],
    itemWidth: [],
    itemHeight: [],
    itemWeight: [],
    itemPackageLength: [],
    itemPackageWidth: [],
    itemPackageHeight: [],
    itemPackageWeight: [],
    noOfPieces: [],
    noOfItems: [],
    manufacture: [],
    marketingComments: [],
    internalComments: [],
    sellStartDate: [],
    sellEndDate: [],
    sellCount: [],
    customFields: [],
    thumbnailUrl: [],
    activeInd: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    reviewLineId: [],
    itemLengthUnitId: [],
    itemWidthUnitId: [],
    itemHeightUnitId: [],
    packageLengthUnitId: [],
    packageWidthUnitId: [],
    packageHeightUnitId: [],
    itemPackageWeightUnitId: [],
    productAttributeId: [],
    productOptionId: [],
    materialId: [],
    currencyId: [],
    barcodeTypeId: [],
    productId: [],
  });

  constructor(
    protected stockItemsService: StockItemsService,
    protected reviewLinesService: ReviewLinesService,
    protected unitMeasureService: UnitMeasureService,
    protected productAttributeService: ProductAttributeService,
    protected productOptionService: ProductOptionService,
    protected materialsService: MaterialsService,
    protected currencyService: CurrencyService,
    protected barcodeTypesService: BarcodeTypesService,
    protected productsService: ProductsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockItems }) => {
      if (!stockItems.id) {
        const today = moment().startOf('day');
        stockItems.sellStartDate = today;
        stockItems.sellEndDate = today;
        stockItems.lastEditedWhen = today;
      }

      this.updateForm(stockItems);

      this.reviewLinesService
        .query({ 'stockItemId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IReviewLines[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IReviewLines[]) => {
          if (!stockItems.reviewLineId) {
            this.reviewlines = resBody;
          } else {
            this.reviewLinesService
              .find(stockItems.reviewLineId)
              .pipe(
                map((subRes: HttpResponse<IReviewLines>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IReviewLines[]) => (this.reviewlines = concatRes));
          }
        });

      this.unitMeasureService.query().subscribe((res: HttpResponse<IUnitMeasure[]>) => (this.unitmeasures = res.body || []));

      this.productAttributeService.query().subscribe((res: HttpResponse<IProductAttribute[]>) => (this.productattributes = res.body || []));

      this.productOptionService.query().subscribe((res: HttpResponse<IProductOption[]>) => (this.productoptions = res.body || []));

      this.materialsService.query().subscribe((res: HttpResponse<IMaterials[]>) => (this.materials = res.body || []));

      this.currencyService.query().subscribe((res: HttpResponse<ICurrency[]>) => (this.currencies = res.body || []));

      this.barcodeTypesService.query().subscribe((res: HttpResponse<IBarcodeTypes[]>) => (this.barcodetypes = res.body || []));

      this.productsService.query().subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body || []));
    });
  }

  updateForm(stockItems: IStockItems): void {
    this.editForm.patchValue({
      id: stockItems.id,
      name: stockItems.name,
      vendorCode: stockItems.vendorCode,
      vendorSKU: stockItems.vendorSKU,
      generatedSKU: stockItems.generatedSKU,
      barcode: stockItems.barcode,
      unitPrice: stockItems.unitPrice,
      recommendedRetailPrice: stockItems.recommendedRetailPrice,
      quantityOnHand: stockItems.quantityOnHand,
      itemLength: stockItems.itemLength,
      itemWidth: stockItems.itemWidth,
      itemHeight: stockItems.itemHeight,
      itemWeight: stockItems.itemWeight,
      itemPackageLength: stockItems.itemPackageLength,
      itemPackageWidth: stockItems.itemPackageWidth,
      itemPackageHeight: stockItems.itemPackageHeight,
      itemPackageWeight: stockItems.itemPackageWeight,
      noOfPieces: stockItems.noOfPieces,
      noOfItems: stockItems.noOfItems,
      manufacture: stockItems.manufacture,
      marketingComments: stockItems.marketingComments,
      internalComments: stockItems.internalComments,
      sellStartDate: stockItems.sellStartDate ? stockItems.sellStartDate.format(DATE_TIME_FORMAT) : null,
      sellEndDate: stockItems.sellEndDate ? stockItems.sellEndDate.format(DATE_TIME_FORMAT) : null,
      sellCount: stockItems.sellCount,
      customFields: stockItems.customFields,
      thumbnailUrl: stockItems.thumbnailUrl,
      activeInd: stockItems.activeInd,
      lastEditedBy: stockItems.lastEditedBy,
      lastEditedWhen: stockItems.lastEditedWhen ? stockItems.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      reviewLineId: stockItems.reviewLineId,
      itemLengthUnitId: stockItems.itemLengthUnitId,
      itemWidthUnitId: stockItems.itemWidthUnitId,
      itemHeightUnitId: stockItems.itemHeightUnitId,
      packageLengthUnitId: stockItems.packageLengthUnitId,
      packageWidthUnitId: stockItems.packageWidthUnitId,
      packageHeightUnitId: stockItems.packageHeightUnitId,
      itemPackageWeightUnitId: stockItems.itemPackageWeightUnitId,
      productAttributeId: stockItems.productAttributeId,
      productOptionId: stockItems.productOptionId,
      materialId: stockItems.materialId,
      currencyId: stockItems.currencyId,
      barcodeTypeId: stockItems.barcodeTypeId,
      productId: stockItems.productId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stockItems = this.createFromForm();
    if (stockItems.id !== undefined) {
      this.subscribeToSaveResponse(this.stockItemsService.update(stockItems));
    } else {
      this.subscribeToSaveResponse(this.stockItemsService.create(stockItems));
    }
  }

  private createFromForm(): IStockItems {
    return {
      ...new StockItems(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      vendorCode: this.editForm.get(['vendorCode'])!.value,
      vendorSKU: this.editForm.get(['vendorSKU'])!.value,
      generatedSKU: this.editForm.get(['generatedSKU'])!.value,
      barcode: this.editForm.get(['barcode'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      recommendedRetailPrice: this.editForm.get(['recommendedRetailPrice'])!.value,
      quantityOnHand: this.editForm.get(['quantityOnHand'])!.value,
      itemLength: this.editForm.get(['itemLength'])!.value,
      itemWidth: this.editForm.get(['itemWidth'])!.value,
      itemHeight: this.editForm.get(['itemHeight'])!.value,
      itemWeight: this.editForm.get(['itemWeight'])!.value,
      itemPackageLength: this.editForm.get(['itemPackageLength'])!.value,
      itemPackageWidth: this.editForm.get(['itemPackageWidth'])!.value,
      itemPackageHeight: this.editForm.get(['itemPackageHeight'])!.value,
      itemPackageWeight: this.editForm.get(['itemPackageWeight'])!.value,
      noOfPieces: this.editForm.get(['noOfPieces'])!.value,
      noOfItems: this.editForm.get(['noOfItems'])!.value,
      manufacture: this.editForm.get(['manufacture'])!.value,
      marketingComments: this.editForm.get(['marketingComments'])!.value,
      internalComments: this.editForm.get(['internalComments'])!.value,
      sellStartDate: this.editForm.get(['sellStartDate'])!.value
        ? moment(this.editForm.get(['sellStartDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      sellEndDate: this.editForm.get(['sellEndDate'])!.value
        ? moment(this.editForm.get(['sellEndDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      sellCount: this.editForm.get(['sellCount'])!.value,
      customFields: this.editForm.get(['customFields'])!.value,
      thumbnailUrl: this.editForm.get(['thumbnailUrl'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      reviewLineId: this.editForm.get(['reviewLineId'])!.value,
      itemLengthUnitId: this.editForm.get(['itemLengthUnitId'])!.value,
      itemWidthUnitId: this.editForm.get(['itemWidthUnitId'])!.value,
      itemHeightUnitId: this.editForm.get(['itemHeightUnitId'])!.value,
      packageLengthUnitId: this.editForm.get(['packageLengthUnitId'])!.value,
      packageWidthUnitId: this.editForm.get(['packageWidthUnitId'])!.value,
      packageHeightUnitId: this.editForm.get(['packageHeightUnitId'])!.value,
      itemPackageWeightUnitId: this.editForm.get(['itemPackageWeightUnitId'])!.value,
      productAttributeId: this.editForm.get(['productAttributeId'])!.value,
      productOptionId: this.editForm.get(['productOptionId'])!.value,
      materialId: this.editForm.get(['materialId'])!.value,
      currencyId: this.editForm.get(['currencyId'])!.value,
      barcodeTypeId: this.editForm.get(['barcodeTypeId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockItems>>): void {
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
