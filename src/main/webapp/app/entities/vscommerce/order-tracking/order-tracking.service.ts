import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrderTracking } from 'app/shared/model/vscommerce/order-tracking.model';

type EntityResponseType = HttpResponse<IOrderTracking>;
type EntityArrayResponseType = HttpResponse<IOrderTracking[]>;

@Injectable({ providedIn: 'root' })
export class OrderTrackingService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/order-trackings';

  constructor(protected http: HttpClient) {}

  create(orderTracking: IOrderTracking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderTracking);
    return this.http
      .post<IOrderTracking>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(orderTracking: IOrderTracking): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderTracking);
    return this.http
      .put<IOrderTracking>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrderTracking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrderTracking[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(orderTracking: IOrderTracking): IOrderTracking {
    const copy: IOrderTracking = Object.assign({}, orderTracking, {
      eventDate: orderTracking.eventDate && orderTracking.eventDate.isValid() ? orderTracking.eventDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.eventDate = res.body.eventDate ? moment(res.body.eventDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((orderTracking: IOrderTracking) => {
        orderTracking.eventDate = orderTracking.eventDate ? moment(orderTracking.eventDate) : undefined;
      });
    }
    return res;
  }
}
