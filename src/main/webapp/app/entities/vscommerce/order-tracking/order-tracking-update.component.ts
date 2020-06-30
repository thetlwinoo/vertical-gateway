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

import { IOrderTracking, OrderTracking } from 'app/shared/model/vscommerce/order-tracking.model';
import { OrderTrackingService } from './order-tracking.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { OrdersService } from 'app/entities/vscommerce/orders/orders.service';
import { ITrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';
import { TrackingEventService } from 'app/entities/vscommerce/tracking-event/tracking-event.service';

type SelectableEntity = IOrders | ITrackingEvent;

@Component({
  selector: 'jhi-order-tracking-update',
  templateUrl: './order-tracking-update.component.html',
})
export class OrderTrackingUpdateComponent implements OnInit {
  isSaving = false;
  orders: IOrders[] = [];
  trackingevents: ITrackingEvent[] = [];

  editForm = this.fb.group({
    id: [],
    carrierTrackingNumber: [],
    eventDetails: [null, [Validators.required]],
    eventDate: [null, [Validators.required]],
    orderId: [],
    trackingEventId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected orderTrackingService: OrderTrackingService,
    protected ordersService: OrdersService,
    protected trackingEventService: TrackingEventService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderTracking }) => {
      if (!orderTracking.id) {
        const today = moment().startOf('day');
        orderTracking.eventDate = today;
      }

      this.updateForm(orderTracking);

      this.ordersService
        .query({ 'orderTrackingId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IOrders[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IOrders[]) => {
          if (!orderTracking.orderId) {
            this.orders = resBody;
          } else {
            this.ordersService
              .find(orderTracking.orderId)
              .pipe(
                map((subRes: HttpResponse<IOrders>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IOrders[]) => (this.orders = concatRes));
          }
        });

      this.trackingEventService.query().subscribe((res: HttpResponse<ITrackingEvent[]>) => (this.trackingevents = res.body || []));
    });
  }

  updateForm(orderTracking: IOrderTracking): void {
    this.editForm.patchValue({
      id: orderTracking.id,
      carrierTrackingNumber: orderTracking.carrierTrackingNumber,
      eventDetails: orderTracking.eventDetails,
      eventDate: orderTracking.eventDate ? orderTracking.eventDate.format(DATE_TIME_FORMAT) : null,
      orderId: orderTracking.orderId,
      trackingEventId: orderTracking.trackingEventId,
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
    const orderTracking = this.createFromForm();
    if (orderTracking.id !== undefined) {
      this.subscribeToSaveResponse(this.orderTrackingService.update(orderTracking));
    } else {
      this.subscribeToSaveResponse(this.orderTrackingService.create(orderTracking));
    }
  }

  private createFromForm(): IOrderTracking {
    return {
      ...new OrderTracking(),
      id: this.editForm.get(['id'])!.value,
      carrierTrackingNumber: this.editForm.get(['carrierTrackingNumber'])!.value,
      eventDetails: this.editForm.get(['eventDetails'])!.value,
      eventDate: this.editForm.get(['eventDate'])!.value ? moment(this.editForm.get(['eventDate'])!.value, DATE_TIME_FORMAT) : undefined,
      orderId: this.editForm.get(['orderId'])!.value,
      trackingEventId: this.editForm.get(['trackingEventId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderTracking>>): void {
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
