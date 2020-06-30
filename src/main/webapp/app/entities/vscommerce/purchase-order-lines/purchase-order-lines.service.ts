import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPurchaseOrderLines } from 'app/shared/model/vscommerce/purchase-order-lines.model';

type EntityResponseType = HttpResponse<IPurchaseOrderLines>;
type EntityArrayResponseType = HttpResponse<IPurchaseOrderLines[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderLinesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/purchase-order-lines';

  constructor(protected http: HttpClient) {}

  create(purchaseOrderLines: IPurchaseOrderLines): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseOrderLines);
    return this.http
      .post<IPurchaseOrderLines>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(purchaseOrderLines: IPurchaseOrderLines): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchaseOrderLines);
    return this.http
      .put<IPurchaseOrderLines>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPurchaseOrderLines>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPurchaseOrderLines[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(purchaseOrderLines: IPurchaseOrderLines): IPurchaseOrderLines {
    const copy: IPurchaseOrderLines = Object.assign({}, purchaseOrderLines, {
      lastReceiptDate:
        purchaseOrderLines.lastReceiptDate && purchaseOrderLines.lastReceiptDate.isValid()
          ? purchaseOrderLines.lastReceiptDate.toJSON()
          : undefined,
      lastEditedWhen:
        purchaseOrderLines.lastEditedWhen && purchaseOrderLines.lastEditedWhen.isValid()
          ? purchaseOrderLines.lastEditedWhen.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastReceiptDate = res.body.lastReceiptDate ? moment(res.body.lastReceiptDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((purchaseOrderLines: IPurchaseOrderLines) => {
        purchaseOrderLines.lastReceiptDate = purchaseOrderLines.lastReceiptDate ? moment(purchaseOrderLines.lastReceiptDate) : undefined;
        purchaseOrderLines.lastEditedWhen = purchaseOrderLines.lastEditedWhen ? moment(purchaseOrderLines.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
