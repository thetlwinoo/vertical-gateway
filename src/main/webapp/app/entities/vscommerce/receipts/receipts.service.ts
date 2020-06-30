import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReceipts } from 'app/shared/model/vscommerce/receipts.model';

type EntityResponseType = HttpResponse<IReceipts>;
type EntityArrayResponseType = HttpResponse<IReceipts[]>;

@Injectable({ providedIn: 'root' })
export class ReceiptsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/receipts';

  constructor(protected http: HttpClient) {}

  create(receipts: IReceipts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(receipts);
    return this.http
      .post<IReceipts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(receipts: IReceipts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(receipts);
    return this.http
      .put<IReceipts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReceipts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReceipts[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(receipts: IReceipts): IReceipts {
    const copy: IReceipts = Object.assign({}, receipts, {
      issuedDate: receipts.issuedDate && receipts.issuedDate.isValid() ? receipts.issuedDate.toJSON() : undefined,
      lastEditedWhen: receipts.lastEditedWhen && receipts.lastEditedWhen.isValid() ? receipts.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.issuedDate = res.body.issuedDate ? moment(res.body.issuedDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((receipts: IReceipts) => {
        receipts.issuedDate = receipts.issuedDate ? moment(receipts.issuedDate) : undefined;
        receipts.lastEditedWhen = receipts.lastEditedWhen ? moment(receipts.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
