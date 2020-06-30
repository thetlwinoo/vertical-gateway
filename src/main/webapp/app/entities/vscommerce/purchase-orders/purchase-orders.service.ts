import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';

type EntityResponseType = HttpResponse<IPurchaseOrders>;
type EntityArrayResponseType = HttpResponse<IPurchaseOrders[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrdersService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/purchase-orders';

  constructor(protected http: HttpClient) {}

  create(purchaseOrders: IPurchaseOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseOrders);
    return this.http
      .post<IPurchaseOrders>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(purchaseOrders: IPurchaseOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseOrders);
    return this.http
      .put<IPurchaseOrders>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPurchaseOrders>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPurchaseOrders[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(purchaseOrders: IPurchaseOrders): IPurchaseOrders {
    const copy: IPurchaseOrders = Object.assign({}, purchaseOrders, {
      orderDate: purchaseOrders.orderDate && purchaseOrders.orderDate.isValid() ? purchaseOrders.orderDate.toJSON() : undefined,
      expectedDeliveryDate:
        purchaseOrders.expectedDeliveryDate && purchaseOrders.expectedDeliveryDate.isValid()
          ? purchaseOrders.expectedDeliveryDate.toJSON()
          : undefined,
      lastEditedWhen:
        purchaseOrders.lastEditedWhen && purchaseOrders.lastEditedWhen.isValid() ? purchaseOrders.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate ? moment(res.body.orderDate) : undefined;
      res.body.expectedDeliveryDate = res.body.expectedDeliveryDate ? moment(res.body.expectedDeliveryDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((purchaseOrders: IPurchaseOrders) => {
        purchaseOrders.orderDate = purchaseOrders.orderDate ? moment(purchaseOrders.orderDate) : undefined;
        purchaseOrders.expectedDeliveryDate = purchaseOrders.expectedDeliveryDate ? moment(purchaseOrders.expectedDeliveryDate) : undefined;
        purchaseOrders.lastEditedWhen = purchaseOrders.lastEditedWhen ? moment(purchaseOrders.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
