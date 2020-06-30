import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPurchaseOrders, PurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';
import { PurchaseOrdersService } from './purchase-orders.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from 'app/entities/vscommerce/delivery-methods/delivery-methods.service';

type SelectableEntity = IPeople | ISuppliers | IDeliveryMethods;

@Component({
  selector: 'jhi-purchase-orders-update',
  templateUrl: './purchase-orders-update.component.html',
})
export class PurchaseOrdersUpdateComponent implements OnInit {
  isSaving = false;
  people: IPeople[] = [];
  suppliers: ISuppliers[] = [];
  deliverymethods: IDeliveryMethods[] = [];

  editForm = this.fb.group({
    id: [],
    orderDate: [null, [Validators.required]],
    expectedDeliveryDate: [],
    supplierReference: [],
    isOrderFinalized: [null, [Validators.required]],
    comments: [],
    internalComments: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    contactPersonId: [],
    supplierId: [],
    deliveryMethodId: [],
  });

  constructor(
    protected purchaseOrdersService: PurchaseOrdersService,
    protected peopleService: PeopleService,
    protected suppliersService: SuppliersService,
    protected deliveryMethodsService: DeliveryMethodsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseOrders }) => {
      if (!purchaseOrders.id) {
        const today = moment().startOf('day');
        purchaseOrders.orderDate = today;
        purchaseOrders.expectedDeliveryDate = today;
        purchaseOrders.lastEditedWhen = today;
      }

      this.updateForm(purchaseOrders);

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.deliveryMethodsService.query().subscribe((res: HttpResponse<IDeliveryMethods[]>) => (this.deliverymethods = res.body || []));
    });
  }

  updateForm(purchaseOrders: IPurchaseOrders): void {
    this.editForm.patchValue({
      id: purchaseOrders.id,
      orderDate: purchaseOrders.orderDate ? purchaseOrders.orderDate.format(DATE_TIME_FORMAT) : null,
      expectedDeliveryDate: purchaseOrders.expectedDeliveryDate ? purchaseOrders.expectedDeliveryDate.format(DATE_TIME_FORMAT) : null,
      supplierReference: purchaseOrders.supplierReference,
      isOrderFinalized: purchaseOrders.isOrderFinalized,
      comments: purchaseOrders.comments,
      internalComments: purchaseOrders.internalComments,
      lastEditedBy: purchaseOrders.lastEditedBy,
      lastEditedWhen: purchaseOrders.lastEditedWhen ? purchaseOrders.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      contactPersonId: purchaseOrders.contactPersonId,
      supplierId: purchaseOrders.supplierId,
      deliveryMethodId: purchaseOrders.deliveryMethodId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchaseOrders = this.createFromForm();
    if (purchaseOrders.id !== undefined) {
      this.subscribeToSaveResponse(this.purchaseOrdersService.update(purchaseOrders));
    } else {
      this.subscribeToSaveResponse(this.purchaseOrdersService.create(purchaseOrders));
    }
  }

  private createFromForm(): IPurchaseOrders {
    return {
      ...new PurchaseOrders(),
      id: this.editForm.get(['id'])!.value,
      orderDate: this.editForm.get(['orderDate'])!.value ? moment(this.editForm.get(['orderDate'])!.value, DATE_TIME_FORMAT) : undefined,
      expectedDeliveryDate: this.editForm.get(['expectedDeliveryDate'])!.value
        ? moment(this.editForm.get(['expectedDeliveryDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      supplierReference: this.editForm.get(['supplierReference'])!.value,
      isOrderFinalized: this.editForm.get(['isOrderFinalized'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      internalComments: this.editForm.get(['internalComments'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      contactPersonId: this.editForm.get(['contactPersonId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      deliveryMethodId: this.editForm.get(['deliveryMethodId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchaseOrders>>): void {
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
