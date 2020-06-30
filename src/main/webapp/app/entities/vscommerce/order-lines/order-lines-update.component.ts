import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IOrderLines, OrderLines } from 'app/shared/model/vscommerce/order-lines.model';
import { OrderLinesService } from './order-lines.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { IPackageTypes } from 'app/shared/model/vscommerce/package-types.model';
import { PackageTypesService } from 'app/entities/vscommerce/package-types/package-types.service';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IOrderPackages } from 'app/shared/model/vscommerce/order-packages.model';
import { OrderPackagesService } from 'app/entities/vscommerce/order-packages/order-packages.service';

type SelectableEntity = IStockItems | IPackageTypes | IPhotos | ISuppliers | IOrderPackages;

@Component({
  selector: 'jhi-order-lines-update',
  templateUrl: './order-lines-update.component.html',
})
export class OrderLinesUpdateComponent implements OnInit {
  isSaving = false;
  stockitems: IStockItems[] = [];
  packagetypes: IPackageTypes[] = [];
  photos: IPhotos[] = [];
  suppliers: ISuppliers[] = [];
  orderpackages: IOrderPackages[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    quantity: [null, [Validators.required]],
    taxRate: [],
    unitPrice: [],
    unitPriceDiscount: [],
    pickedQuantity: [],
    pickingCompletedWhen: [],
    status: [null, [Validators.required]],
    thumbnailUrl: [],
    lineRating: [],
    lineReview: [],
    customerReviewedOn: [],
    supplierResponse: [],
    supplierResponseOn: [],
    likeCount: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    stockItemId: [],
    packageTypeId: [],
    reviewImageId: [],
    supplierId: [],
    orderPackageId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected orderLinesService: OrderLinesService,
    protected stockItemsService: StockItemsService,
    protected packageTypesService: PackageTypesService,
    protected photosService: PhotosService,
    protected suppliersService: SuppliersService,
    protected orderPackagesService: OrderPackagesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderLines }) => {
      if (!orderLines.id) {
        const today = moment().startOf('day');
        orderLines.pickingCompletedWhen = today;
        orderLines.customerReviewedOn = today;
        orderLines.supplierResponseOn = today;
        orderLines.lastEditedWhen = today;
      }

      this.updateForm(orderLines);

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.packageTypesService.query().subscribe((res: HttpResponse<IPackageTypes[]>) => (this.packagetypes = res.body || []));

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.orderPackagesService.query().subscribe((res: HttpResponse<IOrderPackages[]>) => (this.orderpackages = res.body || []));
    });
  }

  updateForm(orderLines: IOrderLines): void {
    this.editForm.patchValue({
      id: orderLines.id,
      description: orderLines.description,
      quantity: orderLines.quantity,
      taxRate: orderLines.taxRate,
      unitPrice: orderLines.unitPrice,
      unitPriceDiscount: orderLines.unitPriceDiscount,
      pickedQuantity: orderLines.pickedQuantity,
      pickingCompletedWhen: orderLines.pickingCompletedWhen ? orderLines.pickingCompletedWhen.format(DATE_TIME_FORMAT) : null,
      status: orderLines.status,
      thumbnailUrl: orderLines.thumbnailUrl,
      lineRating: orderLines.lineRating,
      lineReview: orderLines.lineReview,
      customerReviewedOn: orderLines.customerReviewedOn ? orderLines.customerReviewedOn.format(DATE_TIME_FORMAT) : null,
      supplierResponse: orderLines.supplierResponse,
      supplierResponseOn: orderLines.supplierResponseOn ? orderLines.supplierResponseOn.format(DATE_TIME_FORMAT) : null,
      likeCount: orderLines.likeCount,
      lastEditedBy: orderLines.lastEditedBy,
      lastEditedWhen: orderLines.lastEditedWhen ? orderLines.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      stockItemId: orderLines.stockItemId,
      packageTypeId: orderLines.packageTypeId,
      reviewImageId: orderLines.reviewImageId,
      supplierId: orderLines.supplierId,
      orderPackageId: orderLines.orderPackageId,
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
    const orderLines = this.createFromForm();
    if (orderLines.id !== undefined) {
      this.subscribeToSaveResponse(this.orderLinesService.update(orderLines));
    } else {
      this.subscribeToSaveResponse(this.orderLinesService.create(orderLines));
    }
  }

  private createFromForm(): IOrderLines {
    return {
      ...new OrderLines(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      taxRate: this.editForm.get(['taxRate'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      unitPriceDiscount: this.editForm.get(['unitPriceDiscount'])!.value,
      pickedQuantity: this.editForm.get(['pickedQuantity'])!.value,
      pickingCompletedWhen: this.editForm.get(['pickingCompletedWhen'])!.value
        ? moment(this.editForm.get(['pickingCompletedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      status: this.editForm.get(['status'])!.value,
      thumbnailUrl: this.editForm.get(['thumbnailUrl'])!.value,
      lineRating: this.editForm.get(['lineRating'])!.value,
      lineReview: this.editForm.get(['lineReview'])!.value,
      customerReviewedOn: this.editForm.get(['customerReviewedOn'])!.value
        ? moment(this.editForm.get(['customerReviewedOn'])!.value, DATE_TIME_FORMAT)
        : undefined,
      supplierResponse: this.editForm.get(['supplierResponse'])!.value,
      supplierResponseOn: this.editForm.get(['supplierResponseOn'])!.value
        ? moment(this.editForm.get(['supplierResponseOn'])!.value, DATE_TIME_FORMAT)
        : undefined,
      likeCount: this.editForm.get(['likeCount'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      packageTypeId: this.editForm.get(['packageTypeId'])!.value,
      reviewImageId: this.editForm.get(['reviewImageId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      orderPackageId: this.editForm.get(['orderPackageId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderLines>>): void {
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
