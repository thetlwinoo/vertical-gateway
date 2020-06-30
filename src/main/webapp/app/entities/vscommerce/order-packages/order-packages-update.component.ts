import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IOrderPackages, OrderPackages } from 'app/shared/model/vscommerce/order-packages.model';
import { OrderPackagesService } from './order-packages.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from 'app/entities/vscommerce/delivery-methods/delivery-methods.service';
import { ISpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';
import { SpecialDealsService } from 'app/entities/vscommerce/special-deals/special-deals.service';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from 'app/entities/vscommerce/orders/orders.service';

type SelectableEntity = ISuppliers | IDeliveryMethods | ISpecialDeals | IOrders;

@Component({
  selector: 'jhi-order-packages-update',
  templateUrl: './order-packages-update.component.html',
})
export class OrderPackagesUpdateComponent implements OnInit {
  isSaving = false;
  suppliers: ISuppliers[] = [];
  deliverymethods: IDeliveryMethods[] = [];
  specialdeals: ISpecialDeals[] = [];
  orders: IOrders[] = [];

  editForm = this.fb.group({
    id: [],
    expectedDeliveryDate: [],
    comments: [],
    deliveryInstructions: [],
    internalComments: [],
    packageShippingFee: [],
    packageShippingFeeDiscount: [],
    packagePrice: [],
    packageSubTotal: [],
    packageTaxAmount: [],
    packageVoucherDiscount: [],
    packagePromotionDiscount: [],
    pickingCompletedWhen: [],
    customerReviewedOn: [],
    sellerRating: [],
    sellerReview: [],
    deliveryRating: [],
    deliveryReview: [],
    reviewAsAnonymous: [],
    completedReview: [],
    orderPackageDetails: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    supplierId: [],
    deliveryMethodId: [],
    specialDealsId: [],
    orderId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected orderPackagesService: OrderPackagesService,
    protected suppliersService: SuppliersService,
    protected deliveryMethodsService: DeliveryMethodsService,
    protected specialDealsService: SpecialDealsService,
    protected ordersService: OrdersService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderPackages }) => {
      if (!orderPackages.id) {
        const today = moment().startOf('day');
        orderPackages.expectedDeliveryDate = today;
        orderPackages.pickingCompletedWhen = today;
        orderPackages.customerReviewedOn = today;
        orderPackages.lastEditedWhen = today;
      }

      this.updateForm(orderPackages);

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.deliveryMethodsService.query().subscribe((res: HttpResponse<IDeliveryMethods[]>) => (this.deliverymethods = res.body || []));

      this.specialDealsService.query().subscribe((res: HttpResponse<ISpecialDeals[]>) => (this.specialdeals = res.body || []));

      this.ordersService.query().subscribe((res: HttpResponse<IOrders[]>) => (this.orders = res.body || []));
    });
  }

  updateForm(orderPackages: IOrderPackages): void {
    this.editForm.patchValue({
      id: orderPackages.id,
      expectedDeliveryDate: orderPackages.expectedDeliveryDate ? orderPackages.expectedDeliveryDate.format(DATE_TIME_FORMAT) : null,
      comments: orderPackages.comments,
      deliveryInstructions: orderPackages.deliveryInstructions,
      internalComments: orderPackages.internalComments,
      packageShippingFee: orderPackages.packageShippingFee,
      packageShippingFeeDiscount: orderPackages.packageShippingFeeDiscount,
      packagePrice: orderPackages.packagePrice,
      packageSubTotal: orderPackages.packageSubTotal,
      packageTaxAmount: orderPackages.packageTaxAmount,
      packageVoucherDiscount: orderPackages.packageVoucherDiscount,
      packagePromotionDiscount: orderPackages.packagePromotionDiscount,
      pickingCompletedWhen: orderPackages.pickingCompletedWhen ? orderPackages.pickingCompletedWhen.format(DATE_TIME_FORMAT) : null,
      customerReviewedOn: orderPackages.customerReviewedOn ? orderPackages.customerReviewedOn.format(DATE_TIME_FORMAT) : null,
      sellerRating: orderPackages.sellerRating,
      sellerReview: orderPackages.sellerReview,
      deliveryRating: orderPackages.deliveryRating,
      deliveryReview: orderPackages.deliveryReview,
      reviewAsAnonymous: orderPackages.reviewAsAnonymous,
      completedReview: orderPackages.completedReview,
      orderPackageDetails: orderPackages.orderPackageDetails,
      lastEditedBy: orderPackages.lastEditedBy,
      lastEditedWhen: orderPackages.lastEditedWhen ? orderPackages.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      supplierId: orderPackages.supplierId,
      deliveryMethodId: orderPackages.deliveryMethodId,
      specialDealsId: orderPackages.specialDealsId,
      orderId: orderPackages.orderId,
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
    const orderPackages = this.createFromForm();
    if (orderPackages.id !== undefined) {
      this.subscribeToSaveResponse(this.orderPackagesService.update(orderPackages));
    } else {
      this.subscribeToSaveResponse(this.orderPackagesService.create(orderPackages));
    }
  }

  private createFromForm(): IOrderPackages {
    return {
      ...new OrderPackages(),
      id: this.editForm.get(['id'])!.value,
      expectedDeliveryDate: this.editForm.get(['expectedDeliveryDate'])!.value
        ? moment(this.editForm.get(['expectedDeliveryDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      comments: this.editForm.get(['comments'])!.value,
      deliveryInstructions: this.editForm.get(['deliveryInstructions'])!.value,
      internalComments: this.editForm.get(['internalComments'])!.value,
      packageShippingFee: this.editForm.get(['packageShippingFee'])!.value,
      packageShippingFeeDiscount: this.editForm.get(['packageShippingFeeDiscount'])!.value,
      packagePrice: this.editForm.get(['packagePrice'])!.value,
      packageSubTotal: this.editForm.get(['packageSubTotal'])!.value,
      packageTaxAmount: this.editForm.get(['packageTaxAmount'])!.value,
      packageVoucherDiscount: this.editForm.get(['packageVoucherDiscount'])!.value,
      packagePromotionDiscount: this.editForm.get(['packagePromotionDiscount'])!.value,
      pickingCompletedWhen: this.editForm.get(['pickingCompletedWhen'])!.value
        ? moment(this.editForm.get(['pickingCompletedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      customerReviewedOn: this.editForm.get(['customerReviewedOn'])!.value
        ? moment(this.editForm.get(['customerReviewedOn'])!.value, DATE_TIME_FORMAT)
        : undefined,
      sellerRating: this.editForm.get(['sellerRating'])!.value,
      sellerReview: this.editForm.get(['sellerReview'])!.value,
      deliveryRating: this.editForm.get(['deliveryRating'])!.value,
      deliveryReview: this.editForm.get(['deliveryReview'])!.value,
      reviewAsAnonymous: this.editForm.get(['reviewAsAnonymous'])!.value,
      completedReview: this.editForm.get(['completedReview'])!.value,
      orderPackageDetails: this.editForm.get(['orderPackageDetails'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      supplierId: this.editForm.get(['supplierId'])!.value,
      deliveryMethodId: this.editForm.get(['deliveryMethodId'])!.value,
      specialDealsId: this.editForm.get(['specialDealsId'])!.value,
      orderId: this.editForm.get(['orderId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderPackages>>): void {
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
